import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import { User } from "lucide-react";
import SignOutButton from "./SignOutButton";

const prisma = new PrismaClient();

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email || "" },
    select: {
      id: true,
      email: true,
      name: true,
      totalCoins: true,
      totalTrees: true,
      image: true,
    },
  });

  return (
    <nav className="flex items-center justify-between p-4 bg-green-100 shadow">
      <div className="text-xl font-bold">🌲 Forest Focus</div>

      {user && (
        <div className="flex items-center space-x-3">
          {user.image ? (
            <Image
              src={user.image}
              alt="User"
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <User />
          )}
          <span>{user.name || user.email}</span>
          <SignOutButton />
        </div>
      )}
    </nav>
  );
}
