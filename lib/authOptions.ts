import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        mode: { label: "Mode", type: "text" }, // login | signup
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password, mode } = credentials;

        if (mode === "signup") {
          const existing = await prisma.user.findUnique({ where: { email } });
          if (existing) throw new Error("User already exists");

          const hashed = await hash(password, 10);
          const newUser = await prisma.user.create({
            data: { email, password: hashed },
          });

          return { id: newUser.id, email: newUser.email };
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.password) throw new Error("No user found");

        const isValid = await compare(password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return { id: user.id, email: user.email };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    newUser: "/dashboard",
  },
  callbacks: {
    async redirect({ url }) {
      if (url) return url;
      return "/dashboard";
    },
  },
};
