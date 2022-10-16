import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Loading from "../components/design/Loading";
import ApiError from "../components/design/ApiError";

const nav = [
  {
    name: "Instructions",
    tab: "instructions",
  },
  {
    name: "Ingredientes",
    tab: "ingredients",
  },
];
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

  console.log(details);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        {isLoading ? (
          <title>Loading... </title>
        ) : (
          <title>{details?.title || "Api Error - try again later"}</title>
        )}
        <link
          rel="canonical"
          href={`https://react-recipe-finder-2022.netlify.app/recipe/${id}`}
        />
      </Helmet>

      {isLoading && <Loading message="Loading" />}

      {!isLoading && apiError && <ApiError />}

      {!isLoading && !apiError && (
        <section className="py-16">
          <div className="space-y-4 mb-8">
            <h1 className="text-3xl font-bold">{details.title}</h1>
            <p
              className="max-w-5xl"
              dangerouslySetInnerHTML={{ __html: details.summary }}
            />
          </div>

          <div className="flex items-start gap-8 justify-between ">
            <div className="flex-1 space-y-4">
              <div className="flex gap-8">
                {nav.map((data) => (
                  <p
                    key={data.name}
                    onClick={() => setActiveTab(data.tab)}
                    className={`${
                      activeTab === data.tab
                        ? "border-b-2 border-b-black-500"
                        : ""
                    } cursor-pointer pb-4 font-bold`}
                  >
                    {data.name}
                  </p>
                ))}
              </div>

              <div className="max-w-lg">
                <p
                  className={`${
                    activeTab === "instructions"
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none"
                  } duration-300 absolute w-full h-fit inset-0`}
                  dangerouslySetInnerHTML={{ __html: details.instructions }}
                />

                <div
                  className={`${
                    activeTab === "ingredients"
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none"
                  } duration-300 absolute w-full h-fit inset-0 space-y-1`}
                >
                  {details?.extendedIngredients.map((data) => (
                    <p key={data.id}>{data.original}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex-1">
              <img
                className="rounded-xl"
                src={details.image}
                alt={details.title}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Recipe;
