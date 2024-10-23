import { useState } from "react";
import {
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Charts = ({ characters }) => {
  const [activeChart, setActiveChart] = useState("top");

  // Data processing functions
  const getTopCharactersData = () => {
    return characters
      .sort((a, b) => b.comics.available - a.comics.available)
      .slice(0, 10)
      .map((character) => ({
        name: character.name,
        comics: character.comics.available,
        series: character.series.available,
      }));
  };

  const getComicsDistributionData = () => {
    const distribution = characters.reduce((acc, char) => {
      const range = Math.floor(char.comics.available / 10) * 10;
      const key = `${range}-${range + 9}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(distribution)
      .map(([range, count]) => ({
        range,
        count,
      }))
      .sort((a, b) => parseInt(a.range) - parseInt(b.range));
  };

  const getCorrelationData = () => {
    return characters.map((char) => ({
      name: char.name,
      comics: char.comics.available,
      series: char.series.available,
    }));
  };

  // Chart components
  const TopCharactersChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={getTopCharactersData()}
        margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="comics" fill="#2563eb" name="Comics" />
        <Bar dataKey="series" fill="#db2777" name="Series" />
      </BarChart>
    </ResponsiveContainer>
  );

  const ComicsDistributionChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={getComicsDistributionData()}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="range"
          label={{ value: "Number of Comics Range", position: "bottom" }}
        />
        <YAxis
          label={{
            value: "Number of Characters",
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip />
        <Bar dataKey="count" fill="#2563eb" name="Characters" />
      </BarChart>
    </ResponsiveContainer>
  );

  const CorrelationChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          dataKey="comics"
          name="Comics"
          label={{ value: "Number of Comics", position: "bottom" }}
        />
        <YAxis
          type="number"
          dataKey="series"
          name="Series"
          label={{
            value: "Number of Series",
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter data={getCorrelationData()} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );

  const charts = {
    top: {
      component: TopCharactersChart,
      title: "Top Characters by Comics/Series",
    },
    distribution: {
      component: ComicsDistributionChart,
      title: "Comics Distribution",
    },
    correlation: {
      component: CorrelationChart,
      title: "Comics vs Series Correlation",
    },
  };

  const ChartComponent = charts[activeChart].component;

  return (
    <div className="bg-white p-6 shadow-lg border-8 border-black mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">{charts[activeChart].title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveChart("top")}
            className={`px-4 py-2 rounded ${
              activeChart === "top"
                ? "bg-red-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Top Characters
          </button>
          <button
            onClick={() => setActiveChart("distribution")}
            className={`px-4 py-2 rounded ${
              activeChart === "distribution"
                ? "bg-red-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Distribution
          </button>
          <button
            onClick={() => setActiveChart("correlation")}
            className={`px-4 py-2 rounded ${
              activeChart === "correlation"
                ? "bg-red-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Correlation
          </button>
        </div>
      </div>
      <div className="w-full">
        <ChartComponent />
      </div>
    </div>
  );
};

export default Charts;
