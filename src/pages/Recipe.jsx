import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Loading from "../components/design/Loading";
import ApiError from "../components/design/ApiError";

function Recipe() {
  const { id } = useParams();

  const [details, setDetails] = useState({});
  const [apiError, setApiError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("instructions");

  const getDetails = async (id) => {
    setLoading(true);
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${
        import.meta.env.VITE_API_KEY
      }`
    );

    const data = await res.json();
    if (data.code === 402) {
      setApiError(true);
    }
    setDetails(data);
    setLoading(false);
  };

  useEffect(() => {
    getDetails(id);
  }, [id]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {setApiError ? "Api Error - try again later" : `${details.title}`}
        </title>
        <link
          rel="canonical"
          href={`https://react-recipe-finder-2022.netlify.app/recipe/${id}`}
        />
      </Helmet>

      {isLoading && <Loading message="Loading" />}

      {!isLoading && apiError && <ApiError />}

      {!isLoading && !apiError && (
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
            <img
              className="rounded-xl"
              src={details.image}
              alt={details.title}
            />
          </div>
        </section>
      )}
    </>
  );
}

export default Recipe;
