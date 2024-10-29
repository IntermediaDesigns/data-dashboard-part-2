import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import md5 from "md5";

const CharacterDetails = () => {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const PUBLIC_KEY = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
  const PRIVATE_KEY = import.meta.env.VITE_MARVEL_PRIVATE_KEY;

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const timestamp = new Date().getTime();
        const hash = md5(timestamp + PRIVATE_KEY + PUBLIC_KEY);
        const response = await fetch(
          `https://gateway.marvel.com/v1/public/characters/${id}?ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}`
        );
        const data = await response.json();

        if (data.data.results.length > 0) {
          setCharacter(data.data.results[0]);
        } else {
          setError("Character not found");
        }
        setLoading(false);
      } catch (err) {
        setError("Error fetching character");
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id, PUBLIC_KEY, PRIVATE_KEY]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error)
    return <div className="text-center mt-20 text-red-600">{error}</div>;
  if (!character)
    return <div className="text-center mt-20">Character not found</div>;

  const comicUrl = character.urls.find((url) => url.type === "comiclink")?.url;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg border-8 border-black">
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/dashboard"
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Back to Dashboard
          </Link>
          {comicUrl && (
            <a
              href={comicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition flex items-center gap-2"
            >
              Comics Page
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}
        </div>

        <h1 className="text-4xl font-bold text-red-600 mb-6">
          {character.name}
        </h1>

        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
          className="w-full h-96 object-cover object-center mb-6 rounded-lg"
        />

        <p className="text-lg mb-8">
          {character.description || "No description available."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">
              Comics ({character.comics.available})
            </h2>
            {character.comics.items.length > 0 ? (
              <ul className="space-y-2">
                {character.comics.items.map((comic, index) => (
                  <li key={index} className="text-gray-700">
                    {comic.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No comics available</p>
            )}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-pink-600">
              Series ({character.series.available})
            </h2>
            {character.series.items.length > 0 ? (
              <ul className="space-y-2">
                {character.series.items.map((series, index) => (
                  <li key={index} className="text-gray-700">
                    {series.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No series available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
