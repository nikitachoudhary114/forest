"use client";
import { signOut } from 'next-auth/react';
import React from 'react'
const SignOutButton = () => {
  return (
    <button
      className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
      onClick={() => signOut({ callbackUrl: "/login" })}
    >
      Sign Out
    </button>
  );
};


export default SignOutButton;