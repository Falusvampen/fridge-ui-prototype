import React from "react";

export default function WeekMenu({ children }: { children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <h2 className="text-lg font-semibold text-black mb-3">
        Denna veckas matsedel
      </h2>
      <div className="bg-white rounded-lg shadow p-4">{children}</div>
    </section>
  );
}
