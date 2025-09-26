"use client";

import React, { useState } from "react";
import CircularTimer from "@/components/CircularTimer";

export default function HomePage() {
  const [minutes, setMinutes] = useState(25);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
      {/* Circular Timer Component */}
      <CircularTimer maxMinutes={180} value={minutes} onChange={setMinutes} />

      {/* Selected Time */}
      <p className="text-lg font-medium mt-6">
        Selected Time: <span className="text-green-600">{minutes}</span> min
      </p>

      {/* Plant Button */}
      <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition">
        🌱 Plant
      </button>
    </div>
  );
}
