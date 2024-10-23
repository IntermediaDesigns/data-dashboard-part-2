import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import md5 from 'md5';
import Charts from './Charts';

const About = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const PUBLIC_KEY = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
  const PRIVATE_KEY = import.meta.env.VITE_MARVEL_PRIVATE_KEY;

  useEffect(() => {
    const fetchAllCharacters = async () => {
      try {
        setLoading(true);
        const timestamp = new Date().getTime();
        const hash = md5(timestamp + PRIVATE_KEY + PUBLIC_KEY);
        const response = await fetch(
          `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash}&limit=100`
        );
        const data = await response.json();
        setCharacters(data.data.results);
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchAllCharacters();
  }, []);

  return (
    <>
      <nav className="p-4">
        <div className="flex items-center justify-between mx-6">
          <img src="/dataverselogo.png" alt="logo" className="w-40" />
          <h1 className="font-bangers text-9xl text-shadow-xl text-center font-bold text-red-600 tracking-wide">
            DATAVERSE
          </h1>
          <div className="flex gap-4">
            <Link to="/">
              <button className="px-6 py-4 bg-red-600 text-white font-bold rounded transition duration-300 ease-in-out hover:shadow-2xl hover:scale-105 hover:bg-red-700">
                Main Page
              </button>
            </Link>
            <Link to="/dashboard">
              <button className="px-6 py-4 bg-red-600 text-white font-bold rounded transition duration-300 ease-in-out hover:shadow-2xl hover:scale-105 hover:bg-red-700">
                Dashboard
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-lg shadow-lg border-8 border-black mb-8">
          <h2 className="text-4xl font-bold text-red-600 mb-6">About Marvel Dataverse</h2>
          <p className="text-lg mb-4">
            Marvel Dataverse is an interactive dashboard that allows you to explore and analyze
            data about Marvel characters. Using the official Marvel API, we provide insights
            into characters, their comic appearances, and series involvement.
          </p>
          <p className="text-lg mb-4">
            The dashboard features various tools to help you discover and understand the vast
            Marvel universe:
          </p>
          <ul className="list-disc list-inside mb-6 text-lg">
            <li>Character search and filtering capabilities</li>
            <li>Detailed character information and statistics</li>
            <li>Interactive data visualizations</li>
            <li>Comprehensive character analytics</li>
          </ul>
        </div>

        {loading ? (
          <div className="text-center">
            <p className="text-xl">Loading charts...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-600">
            <p className="text-xl">{error}</p>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-bold mb-6">Data Visualization</h2>
            <Charts characters={characters} />
          </div>
        )}
      </div>
    </>
  );
};

export default About;