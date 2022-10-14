import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/skyblue";
import RecipeCard from "../design/RecipeCard";

function Veggie() {
  const [veggie, setVeggie] = useState([]);

  const getVeggies = async (url) => {
    const cachedData = localStorage.getItem("veggies");
    if (cachedData) {
      setVeggie(JSON.parse(cachedData));
    } else {
      const res = await fetch(url);
      const { recipes } = await res.json();
      localStorage.setItem("veggies", JSON.stringify(recipes));
      setVeggie(recipes);
      console.log(recipes);
    }
  };

  useEffect(() => {
    getVeggies(
      `https://api.spoonacular.com/recipes/random?apiKey=${
        import.meta.env.VITE_API_KEY
      }&number=10&tags=vegetarian`
    );
  }, []);

  return (
    <>
      <section className="pt-8 pb-16">
        <h1 className="font-bold text-2xl mb-6">Vegetarian Itmes</h1>

        <Splide
          options={{
            arrows: false,
            perPage: 4,
            gap: "1rem",
            pagination: false,
            drag: "free",
          }}
        >
          {veggie.map((data) => (
            <SplideSlide key={data.id}>
              <RecipeCard data={data} />
            </SplideSlide>
          ))}
        </Splide>
      </section>
    </>
  );
}

export default Veggie;
