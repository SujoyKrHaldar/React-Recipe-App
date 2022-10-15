import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

function Recipe() {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  const getDetails = async (id) => {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${
        import.meta.env.VITE_API_KEY
      }`
    );

    const data = await res.json();
    setDetails(data);
    console.log(data);
  };

  useEffect(() => {
    getDetails(id);
  }, [id]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${details.title}`} - React recipe finder</title>
        <link
          rel="canonical"
          href={`https://react-recipe-finder-2022.netlify.app/recipe/${id}`}
        />
      </Helmet>

      <section className="py-16 flex justify-between gap-8 ">
        <div className="flex-1">
          <div className="">
            <h1 className="text-3xl font-bold">{details.title}</h1>

            <div className="flex gap-4">
              <p
                onClick={() => setActiveTab("instructions")}
                className={`${
                  activeTab === "instructions"
                    ? "border-b border-b-black-500"
                    : ""
                } cursor-pointer py-4`}
              >
                Instructions
              </p>
              <p
                onClick={() => setActiveTab("ingredients")}
                className={`${
                  activeTab === "ingredients"
                    ? "border-b border-b-black-500"
                    : ""
                } cursor-pointer py-4`}
              >
                Ingredientes
              </p>
            </div>
          </div>

          <div className="">
            <p>{details.summary}</p>
          </div>
        </div>
        <div className="flex-1">
          <img className="rounded-xl" src={details.image} alt={details.title} />
        </div>
      </section>
    </>
  );
}

export default Recipe;
