import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RecipeCard from "../components/design/RecipeCard";

function Category() {
  const { id } = useParams();

  const [cuisine, setCuisine] = useState([]);

  const getRecipes = async (name) => {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
        import.meta.env.VITE_API_KEY
      }&cuisine=${name}`
    );
    const { results } = await res.json();
    setCuisine(results);
  };

  useEffect(() => {
    getRecipes(id);
  }, [id]);

  return (
    <section className="py-8">
      {cuisine.length > 0 ? (
        <div className="space-y-6">
          <h1 className="font-bold text-2xl first-letter:uppercase">
            {id} foods
          </h1>

          <div className="grid grid-cols-4 gap-4">
            {cuisine.map((data) => (
              <RecipeCard key={data.id} data={data} className="h-[260px]" />
            ))}
          </div>
        </div>
      ) : (
        <h1 className="font-bold text-2xl">No Food found!</h1>
      )}
    </section>
  );
}

export default Category;
