import { useState, useEffect } from "react";
import md5 from "md5";
import { Link, useNavigate } from "react-router-dom";

const TopNav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 p-4 z-50">
      <div className="flex items-center justify-between mx-6 flex-wrap">
        <img src="/dataverselogo.png" alt="logo" className="w-20 sm:w-40" />
        <h1 className="font-bangers text-4xl md:text-7xl lg:text-9xl text-shadow-xl text-center font-bold text-red-600 tracking-wide">
          DATAVERSE
        </h1>
        <div></div>
      </div>
    </nav>
  );
};

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Hamburger button for mobile */}
      <button
        className="fixed top-40 left-4 z-50 lg:hidden bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-colors"
        onClick={toggleSidebar}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed h-auto mt-60 w-72 border-4 border-black shadow-lg bg-amber-300 
          flex flex-col gap-7 items-center py-5 transition-all duration-300 ease-in-out 
          ${isOpen ? "translate-x-3" : "-translate-x-72"} 
          left-0 top-0 bottom-0`}
      >
        {/* Toggle button for desktop */}
        <button
          className="absolute -right-12 top-0 hidden lg:block bg-red-600 text-white p-2 rounded-r-md hover:bg-red-700 transition-colors"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 transition-transform duration-300 ${
              isOpen ? "rotate-0" : "rotate-180"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Sidebar content */}
        <div className="w-full px-4">
          <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">
            Dataverse Menu
          </h2>

          <div className="flex flex-col gap-4">
            <Link to="/">
              <button className="w-full px-6 py-4 bg-red-600 text-white font-bold rounded transition duration-300 ease-in-out hover:shadow-2xl hover:scale-105 hover:bg-red-700">
                Main Page
              </button>
            </Link>
            <Link to="/about">
              <button className="w-full px-6 py-4 bg-red-600 text-white font-bold rounded transition duration-300 ease-in-out hover:shadow-2xl hover:scale-105 hover:bg-red-700">
                About
              </button>
            </Link>

            <div className="p-4 border-2 border-black rounded text-center bg-white">
              <h3 className="font-bold mb-2 text-2xl text-wrap">Quick Stats</h3>
              <p className="font-bold">
                Most Comics: <span className="font-normal">Spider-Man</span>
              </p>
              <p className="font-bold">
                Most Series: <span className="font-normal">X-Men</span>
              </p>
            </div>

            <div className="p-4 border-2 border-black rounded text-center bg-white">
              <h3 className="font-bold mb-2 text-2xl text-wrap">
                Popular Characters
              </h3>
              <ul className="space-y-2">
                <li>Spider-Man</li>
                <li>Iron Man</li>
                <li>Captain America</li>
                <li>Thor</li>
              </ul>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed lg:hidden" onClick={toggleSidebar} />
      )}
    </>
  );
};

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed right-10 bottom-100 mt-4 bg-red-600 text-white p-3 rounded-full shadow-lg transition duration-300 ease-in-out hover:bg-red-700 hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </>
  );
};

const LetterSelector = ({ selectedLetter, onLetterSelect }) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="flex flex-wrap justify-center mb-4">
      <button
        className={`m-1 px-3 py-1 border-2 border-black ${
          selectedLetter === "" ? "bg-red-600 text-white" : "bg-white"
        }`}
        onClick={() => onLetterSelect("")}
      >
        All
      </button>
      {alphabet.map((letter) => (
        <button
          key={letter}
          className={`m-1 px-3 py-1 border-2 border-black ${
            selectedLetter === letter ? "bg-red-600 text-white" : "bg-white"
          }`}
          onClick={() => onLetterSelect(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

const CharacterModal = ({ character, onClose }) => {
  if (!character) return null;

  // Find the comic URL
  const comicUrl = character.urls.find((url) => url.type === "comiclink")?.url;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-3xl font-bold text-red-600">{character.name}</h2>
          <button onClick={onClose} className="text-2xl font-bold">
            &times;
          </button>
        </div>
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
          className="w-full h-64 object-cover object-center mb-4"
        />
        <div className="flex justify-between items-center mb-4">
          <p className="flex-1">
            {character.description || "No description available."}
          </p>
          {comicUrl && (
            <a
              href={comicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-4 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition duration-300 flex items-center gap-2"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">
              Comics ({character.comics.available})
            </h3>
            {character.comics.items.length > 0 ? (
              <ul className="list-disc list-inside space-y-1">
                {character.comics.items.slice(0, 5).map((comic, index) => (
                  <li key={index} className="text-gray-700">
                    {comic.name}
                  </li>
                ))}
                {character.comics.items.length > 5 && (
                  <li className="text-gray-500 italic">
                    And {character.comics.items.length - 5} more...
                  </li>
                )}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No comics available</p>
            )}
          </div>
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="text-xl font-semibold mb-2 text-pink-600">
              Series ({character.series.available})
            </h3>
            {character.series.items.length > 0 ? (
              <ul className="list-disc list-inside space-y-1">
                {character.series.items.slice(0, 5).map((series, index) => (
                  <li key={index} className="text-gray-700">
                    {series.name}
                  </li>
                ))}
                {character.series.items.length > 5 && (
                  <li className="text-gray-500 italic">
                    And {character.series.items.length - 5} more...
                  </li>
                )}
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

const RangeSlider = ({ min, max, value, onChange, label }) => {
  return (
    <div className="flex-1">
      <label className="block mb-1 font-sans font-bold text-2xl">{label}</label>
      <div className="flex items-center space-x-2">
        <input
          type="range"
          min={min}
          max={max}
          value={value[0]}
          onChange={(e) => onChange([parseInt(e.target.value), value[1]])}
          className="w-full"
          style={{ accentColor: "red" }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value[1]}
          onChange={(e) => onChange([value[0], parseInt(e.target.value)])}
          className="w-full"
          style={{ accentColor: "red" }}
        />
      </div>
      <div className="flex justify-between">
        <span>{value[0]}</span>
        <span>{value[1]}</span>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [characters, setCharacters] = useState([]);
  const [displayedCharacters, setDisplayedCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Updated filters state
  const [filters, setFilters] = useState({
    comics: [0, 100],
    series: [0, 100],
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const PUBLIC_KEY = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
  const PRIVATE_KEY = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
  const FETCH_LIMIT = 100;
  const DISPLAY_LIMIT = 30;

  const fetchCharacters = async (newSearch = false) => {
    try {
      setLoading(true);
      const timestamp = new Date().getTime();
      const hash = md5(timestamp + PRIVATE_KEY + PUBLIC_KEY);
      let url = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}&limit=${FETCH_LIMIT}&offset=${
        newSearch ? 0 : offset
      }`;

      if (selectedLetter) {
        url += `&nameStartsWith=${selectedLetter}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.data.results.length > 0) {
        if (newSearch) {
          setCharacters(data.data.results);
          setOffset(FETCH_LIMIT);
        } else {
          setCharacters((prevCharacters) => [
            ...prevCharacters,
            ...data.data.results,
          ]);
          setOffset((prevOffset) => prevOffset + FETCH_LIMIT);
        }
        setHasMore(data.data.total > offset + FETCH_LIMIT);
      } else {
        setHasMore(false);
      }

      setLoading(false);
    } catch {
      setError("Error fetching data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters(true);
  }, [selectedLetter]);

  useEffect(() => {
    filterAndDisplayCharacters();
  }, [characters, searchTerm, filters]);

  // Updated filterAndDisplayCharacters function
  const filterAndDisplayCharacters = () => {
    const filtered = characters.filter((character) => {
      return (
        character.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        character.comics.available >= filters.comics[0] &&
        character.comics.available <= filters.comics[1] &&
        character.series.available >= filters.series[0] &&
        character.series.available <= filters.series[1]
      );
    });
    setDisplayedCharacters(filtered.slice(0, DISPLAY_LIMIT));
  };

  const loadMore = () => {
    if (displayedCharacters.length < characters.length) {
      const nextBatch = characters.slice(
        displayedCharacters.length,
        displayedCharacters.length + DISPLAY_LIMIT
      );
      setDisplayedCharacters((prev) => [...prev, ...nextBatch]);
    } else if (hasMore) {
      fetchCharacters();
    }
  };

  const handleLetterSelect = (letter) => {
    setSelectedLetter(letter);
    setCharacters([]);
    setDisplayedCharacters([]);
    setOffset(0);
    setHasMore(true);
  };

  // Summary statistics
  const totalCharacters = characters.length;
  const averageComics =
    characters.reduce((sum, character) => sum + character.comics.available, 0) /
      totalCharacters || 0;
  const maxSeries = Math.max(
    ...characters.map((character) => character.series.available),
    0
  );

  const navigate = useNavigate();

const handleCharacterClick = (character) => {
  navigate(`/character/${character.id}`);
};

  return (
    <>
      <TopNav />
      <div className="flex pt-48">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main
          className={`transition-all duration-300 ease-in-out 
        ${isSidebarOpen ? "lg:ml-80 ml-0" : "ml-0"} 
        w-full p-8`}
        >
          <h1 className="text-4xl text-center font-bold mt-2 mb-4">
            Welcome to the Marvel Dataverse Dashboard!
          </h1>

          <LetterSelector
            selectedLetter={selectedLetter}
            onLetterSelect={handleLetterSelect}
          />

          {/* Search bar */}
          <input
            type="text"
            placeholder="Search characters"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 mb-4 text-gray-800 placeholder:text-gray-800 border-black border-4"
          />

          {/* Filters */}
          <div className="flex items-center justify-center mb-6 flex-wrap sm:flex-nowrap sm:gap-4">
            <div className="w-full">
              <RangeSlider
                min={0}
                max={100}
                value={filters.comics}
                onChange={(value) => setFilters({ ...filters, comics: value })}
                label="Comics Range"
              />
            </div>
            <div className="w-full">
              <RangeSlider
                min={0}
                max={100}
                value={filters.series}
                onChange={(value) => setFilters({ ...filters, series: value })}
                label="Series Range"
              />
            </div>
          </div>

          {/* Summary statistics */}
          <div className="bg-lime-300 p-6 mb-8 shadow-lg border-8 border-white text-center">
            <h2 className="text-2xl font-semibold mb-4">Summary Statistics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 shadow-lg border-8 border-black">
                <p className="text-lg font-semibold">Total Characters</p>
                <p className="text-3xl text-red-600">{totalCharacters}</p>
              </div>
              <div className="bg-white p-4 shadow-lg border-8 border-black">
                <p className="text-lg font-semibold text-wrap">
                  Avg Comics / Character
                </p>
                <p className="text-3xl text-red-600">
                  {averageComics.toFixed(2)}
                </p>
              </div>
              <div className="bg-white p-4 border-8 border-black shadow-lg">
                <p className="text-lg font-semibold">Max Series</p>
                <p className="text-3xl text-red-600">{maxSeries}</p>
              </div>
            </div>
          </div>

          {/* Character list */}
          {loading && displayedCharacters.length === 0 ? (
            <p className="text-center text-xl">Loading...</p>
          ) : error ? (
            <p className="text-center text-xl text-red-600">{error}</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {displayedCharacters.map((character) => (
                  <div
                    key={character.id}
                    className="bg-white p-6 shadow-md border-8 border-black cursor-pointer transition duration-300 ease-in-out text-center text-wrap hover:shadow-xl hover:scale-105"
                    onClick={() => handleCharacterClick(character)}
                  >
                    <h3 className="text-2xl text-center font-semibold mb-2">
                      {character.name}
                    </h3>
                    <p className="text-xl mb-1">
                      Comics:{" "}
                      <span className="text-blue-600">
                        {character.comics.available}
                      </span>
                    </p>
                    <p className="text-xl">
                      Series:{" "}
                      <span className="text-pink-600">
                        {character.series.available}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
              {(displayedCharacters.length < characters.length || hasMore) && (
                <button
                  onClick={loadMore}
                  className="mt-6 px-4 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              )}
            </>
          )}
          <BackToTopButton />
          
        </main>
      </div>
    </>
  );
};

export default Dashboard;
