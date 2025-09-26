"use client";

import React, { useState } from "react";
import CircularTimer from "@/components/CircularTimer";
import axios from "axios";

export default function DashboardClient() {
  const [minutes, setMinutes] = useState(25);
  const [loading, setLoading] = useState(false);

  async function handlePlant() {
    try {
      setLoading(true);
      const res = await axios.post("/api/session", {
        duration: minutes,
      });

      if (res.data) {
        alert("🌱 Focus session planted successfully!");
      } else {
        alert("Something went wrong.");
        }
        console.log(res)
    } catch (err: any) {
      console.error(err);
      console.log(err.response?.data?.error || "Error saving session");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 bg-white text-gray-800">
      <CircularTimer maxMinutes={180} value={minutes} onChange={setMinutes} />

      <p className="text-lg font-medium mt-6">
        Selected Time: <span className="text-green-600">{minutes}</span> min
      </p>

      <button
        onClick={handlePlant}
        disabled={loading}
        className={`mt-4 px-8 py-3 rounded-xl shadow-md font-semibold text-white transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {loading ? "🌱 Planting..." : "🌱 Plant"}
      </button>
    </div>
  );
}
