import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import { User } from "lucide-react";
import { authOptions } from "@/lib/authOptions";
import SignOutButton from "./SignOutButton";


const prisma = new PrismaClient();

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login"); // redirect if not logged in
  }

  // ✅ Fetch user from DB using Prisma
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
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <div className="text-2xl font-bold">Dashboard</div>
      <div>Forest app 🌲</div>
      <SignOutButton/>
      {user && (
        <div className="flex items-center space-x-2">
          {user.image ? (
            <Image
              src={user.image}
              alt="User avatar"
              width={48}
              height={48}
              className="rounded-full"
            />
          ) : (
            <User />
          )}
          <span>{user.name || user.email}</span>
        </div>
      )}

      <h1>Profile</h1>
      <div>Name: {user?.name}</div>
      <div>Total Coins: {user?.totalCoins}</div>
      <div>Total Trees: {user?.totalTrees}</div>
    </div>
  );
}


