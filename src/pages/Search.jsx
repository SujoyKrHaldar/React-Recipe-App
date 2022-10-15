import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import RecipeCard from "../components/design/RecipeCard";

function Search() {
  const [reqdata, setReqData] = useState([]);
  const { id } = useParams();
  const query = id.replaceAll("-", " ");

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
    getSearchedData(query);
  }, [id]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title> Result - {query} - React recipe finder</title>
      </Helmet>

      <section className="py-8">
        {reqdata.length > 0 ? (
          <div className="space-y-6">
            <h1 className="font-bold text-2xl">Searched result - {query}</h1>

            <div className="grid grid-cols-4 gap-4">
              {reqdata.map((data) => (
                <RecipeCard key={data.id} data={data} className="h-[260px]" />
              ))}
            </div>
          </div>
        ) : (
          <h1 className="font-bold text-2xl">No result!</h1>
        )}
      </section>
    </>
  );
}

export default Search;
