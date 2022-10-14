import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeCard from "../components/design/RecipeCard";

function Search() {
  const [reqdata, setReqData] = useState([]);
  const { id } = useParams();
  console.log(id);
  // console.log("name", id.replaceAll("-", " "));
  // const query = id.replaceAll("-", " ");

  const getSearchedData = async (name) => {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
        import.meta.env.VITE_API_KEY
      }&query=${name}`
    );
    const { results } = await res.json();
    setReqData(results);
  };

  useEffect(() => {
    getSearchedData(id);
  }, [id]);

  return (
    <section className="py-8">
      {/* {reqdata.length > 0 ? (
        <div className="space-y-6">
          <h1 className="font-bold text-2xl">Searched result - {id}</h1>

          <div className="grid grid-cols-4 gap-4">
            {reqdata.map((data) => (
              <RecipeCard key={data.id} data={data} className="h-[260px]" />
            ))}
          </div>
        </div>
      ) : (
        <h1 className="font-bold text-2xl">No result!</h1>
      )} */}
    </section>
  );
}

export default Search;
