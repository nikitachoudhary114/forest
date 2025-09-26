"use client";

import React from "react";
import CircularSlider from "@fseehawer/react-circular-slider";

interface CircularTimerProps {
  maxMinutes: number;
  value: number;
  onChange: (value: number) => void;
}

export default function CircularTimer({
  maxMinutes,
  value,
  onChange,
}: CircularTimerProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Title */}
      <h1 className="text-2xl font-semibold mb-6">Set Your Focus Time</h1>

      {/* Circular Timer Picker */}
      <CircularSlider
        label="Minutes"
        width={260}
        labelColor="#374151" // Tailwind gray-700
        knobColor="#10B981" // Tailwind green-500
        progressColorFrom="#10B981"
        progressColorTo="#10B981"
        trackColor="#E5E7EB" // Tailwind gray-200
        data={Array.from({ length: maxMinutes }, (_, i) => i + 1)}
        dataIndex={value - 1}
        onChange={(val: string | number) => onChange(Number(val))}
      />
    </div>
  );
}
