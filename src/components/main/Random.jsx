import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/skyblue";
import RecipeCard from "../design/RecipeCard";

function Random() {
  const [popular, setPopular] = useState([]);

  const getPopular = async (url) => {
    const cachedData = localStorage.getItem("popular");
    if (cachedData) {
      setPopular(JSON.parse(cachedData));
    } else {
      const res = await fetch(url);
      const { recipes } = await res.json();
      localStorage.setItem("popular", JSON.stringify(recipes));
      setPopular(recipes);
    }
  };

  useEffect(() => {
    getPopular(
      `https://api.spoonacular.com/recipes/random?apiKey=${
        import.meta.env.VITE_API_KEY
      }&number=10`
    );
  }, []);

  return (
    <>
      <section className="py-8">
        <h1 className="font-bold text-2xl mb-6">Popular Recipes</h1>

        <Splide
          options={{
            arrows: false,
            perPage: 3,
            gap: "1rem",
            pagination: false,
            drag: "free",
          }}
        >
          {popular.map((data) => (
            <SplideSlide key={data.id}>
              <RecipeCard data={data} className="h-[260px]" />
            </SplideSlide>
          ))}
        </Splide>
      </section>
    </>
  );
}

export default Random;
