"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      mode: "signup",
      callbackUrl: `${window.location.origin}/dashboard`,
    });

    if (!res?.error) {
      router.push("/dashboard");
    } else {
      alert(res.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSignup} className="flex flex-col space-y-2 w-64">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-green-600 text-white p-2 rounded" type="submit">
          Sign Up
        </button>
      </form>

      <button
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        Sign Up with Google
      </button>
    </div>
  );
}
