import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcrypt";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    // Google Login / Signup
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // Credentials Login / Signup
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        mode: { label: "Mode", type: "text" }, // 👈 "login" or "signup"
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const { email, password, mode } = credentials;

        // 🔹 Handle SIGNUP
        if (mode === "signup") {
          const existing = await prisma.user.findUnique({ where: { email } });
          if (existing) throw new Error("User already exists");

          const hashed = await hash(password, 10);
          const newUser = await prisma.user.create({
            data: { email, password: hashed, createdAt: new Date() },
          });

          return { id: newUser.id, email: newUser.email };
        }

        // 🔹 Handle LOGIN
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
    async redirect({ url, baseUrl }) {
      // Always redirect to callbackUrl if provided
      if (url) return url;
      return "/dashboard"; // fallback
    },
  },
});

export { handler as GET, handler as POST };
