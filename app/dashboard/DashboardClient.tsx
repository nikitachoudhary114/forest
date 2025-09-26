"use client";

import { useState } from "react";
import CircularTimer from "@/components/CircularTimer";

export default function DashboardClient() {
  const [minutes, setMinutes] = useState(25);

  const handlePlant = () => {
    console.log("Planting session with:", minutes, "minutes");
    // Later -> call your POST API here
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow space-y-6">
      <CircularTimer maxMinutes={180} value={minutes} onChange={setMinutes} />

      <p className="text-lg font-medium">
        Selected Time: <span className="text-green-600">{minutes}</span> min
      </p>

      <button
        onClick={handlePlant}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition"
      >
        🌱 Plant
      </button>
    </div>
  );
}
