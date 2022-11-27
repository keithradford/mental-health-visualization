import { useState } from "react";
import "./App.css";
import BubbleChart from "./BubbleChart";
import Map from "./Map";
import { HiOutlineGlobe } from "react-icons/hi";
import { AiOutlineDotChart } from "react-icons/ai";

import data from "./data";

function App() {
  const [showMap, setShowMap] = useState(true);
  const [gender, setGender] = useState("both");
  const [worker, setWorker] = useState("all");
  const [country, setCountry] = useState("all");

  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  function handleZoomIn() {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
  }

  return (
    // align center
    <div className="bg-gradient-to-b from-white via-purple-100 to-pink-200 min-h-screen">
      <div className="flex flex-col mt-5 justify-center items-left w-full px-72">
        <h1 className="text-5xl font-bold ml-[341px]">
          The importance of mental healthcare workers
        </h1>
        <h2 className="text-2xl text-gray-600 semi-bold ml-[341px] mb-5">
          {showMap
            ? "Comparing how the amount of mental healthcare workers effects a countries suicide rate"
            : "How the availability of mental healthcare workers and facilities effects a countries suicide rate"}
        </h2>
        <div className="flex-col justify-center items-center w-full test">
          <div className={`grid space-x-3 grid-cols-2`}>
            <div className="justify-self-start">
              <h2 className="text-2xl font-bold mt-5">Viewing options</h2>
            </div>
            <div className="flex justify-self-end">
              <button
                onClick={() => setShowMap(true)}
                className={
                  showMap === true
                    ? "bg-green-300 px-3 py-1 rounded-l-lg hover:bg-green-200"
                    : "bg-green-100 px-3 py-1 rounded-l-lg hover:bg-green-200"
                }
              >
                <HiOutlineGlobe size="40px" />
              </button>
              <button
                onClick={() => setShowMap(false)}
                className={
                  showMap === false
                    ? "bg-green-300 px-3 py-1 rounded-r-lg hover:bg-green-200"
                    : "bg-green-100 px-3 py-1 rounded-r-lg hover:bg-green-200"
                }
              >
                <AiOutlineDotChart size="40px" />
              </button>
              <div className="flex justify-center items-center bg-blue-200 px-4 py-2 rounded-lg ml-2">
                <div>Gender:</div>
                <select
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                  className="ml-1 bg-gray-100 px-1 rounded-md w-[75px]"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="both">All</option>
                </select>
              </div>
              <div
                className={
                  showMap === false
                    ? "hidden"
                    : "flex justify-center items-center ml-2 bg-purple-200 px-4 py-2 rounded-lg"
                }
              >
                <div>Zoom:</div>
                <div className="space-x-1 ml-1">
                  <button
                    onClick={handleZoomIn}
                    className="bg-orange-400 px-2 rounded-full text-white"
                  >
                    +
                  </button>
                  <button
                    onClick={handleZoomOut}
                    className="bg-orange-400 px-2 rounded-full text-white"
                  >
                    -
                  </button>
                </div>
              </div>
              <div
                className={
                  showMap === true
                    ? "hidden"
                    : "flex justify-center items-center ml-2 bg-purple-200 px-4 py-2 rounded-lg"
                }
              >
                <div>Worker:</div>
                <select
                  value={worker}
                  onChange={(e) => {
                    setWorker(e.target.value);
                  }}
                  className="ml-1 bg-gray-100 px-1 rounded-md w-[75px]"
                >
                  <option value="all">All</option>
                  <option value="nurses">Nurses</option>
                  <option value="psychiatrists">Psychiatrists</option>
                  <option value="psychologists">Psychologists</option>
                  <option value="socialWorkers">Social Workers</option>
                </select>
              </div>
              <div
                className={
                  showMap === true
                    ? "hidden"
                    : "flex justify-center items-center ml-2 bg-yellow-200 px-4 py-2 rounded-lg"
                }
              >
                <div>Country:</div>
                <select
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                  className="ml-1 bg-gray-100 px-1 rounded-md w-[150px]"
                >
                  <option value="all">Select a country</option>
                  {data.map((country) => (
                    <option value={country.country}>{country.country}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {showMap ? (
            <Map
              gender={gender}
              position={position}
              setPosition={setPosition}
              handleZoomIn={handleZoomIn}
              handleZoomOut={handleZoomOut}
            />
          ) : (
            <BubbleChart
              gender={gender}
              worker={worker}
              countrySelected={country}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
