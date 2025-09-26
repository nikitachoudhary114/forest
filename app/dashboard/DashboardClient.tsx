"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";

const CircularTimer = dynamic(() => import("@/components/CircularTimer"), {
  ssr: false,
});

export default function DashboardClient() {
  const [minutes, setMinutes] = useState(25);

  return (
    <div className="flex flex-col items-center justify-center flex-grow space-y-6">
      <CircularTimer maxMinutes={180} value={minutes} onChange={setMinutes} />

      <p className="text-lg font-medium">
        Selected Time: <span className="text-green-600">{minutes}</span> min
      </p>

      <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition">
        🌱 Plant
      </button>
    </div>
  );
}
