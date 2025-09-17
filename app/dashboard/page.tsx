"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { User } from "lucide-react";
import Image from "next/image";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <div className="text-2xl font-bold">Dashboard</div>
      <div>Forest app 🌲</div>

      {session?.user && (
        <div className="flex items-center space-x-2">
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt="User avatar"
              width={48}
              height={48}
              className="rounded-full"
            />
          ) : (
            <User />
          )}

          <span>{session.user.name || session.user.email}</span>
        </div>
      )}

      <button
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        Sign Out
      </button>
    </div>
  );
}
