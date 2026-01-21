import React from "react";
import RecipeList from "./RecipeList";

export default function WeeklyMenu() {
  return (
    <section className="mt-6">
      <h2 className="text-lg font-semibold text-black mb-3">
        Veckans matsedel
      </h2>
      <div className="bg-white rounded-lg shadow p-4">
        <RecipeList />
      </div>
    </section>
  );
}
