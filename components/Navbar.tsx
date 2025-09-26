import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/lib/authOptions";
import Image from "next/image";
import { User } from "lucide-react";
import SignOutButton from "./SignOutButton";

const prisma = new PrismaClient();

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  if (!session) return null; // hide navbar if not logged in

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
    <nav className="w-full flex justify-between items-center p-4 bg-green-100 shadow-md">
      <div className="font-bold text-lg">🌲 Forest App</div>

      <div className="flex items-center space-x-4">
        {user?.image ? (
          <Image
            src={user.image}
            alt="User avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <User />
        )}
        <div className="text-sm">
          <div>{user?.name || user?.email}</div>
          <div className="text-xs text-gray-600">
            {user?.totalCoins} coins • {user?.totalTrees} trees
          </div>
        </div>
        <SignOutButton />
      </div>
    </nav>
  );
}
