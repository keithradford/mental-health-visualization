import React, { memo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Sphere,
  ZoomableGroup,
} from "react-simple-maps";

// import array from countries.json
import countries from "./countries.json";
import suicide_rates from "./suicide_rates.json";
import mental_healthcare_workers from "./mental_healthcare_workers.json";

const Map = () => {
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [year, setYear] = useState(2016);
  const [gender, setGender] = useState("both");

  function handleZoomIn() {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
  }

  function handleMoveEnd(position) {
    setPosition(position);
  }

  return (
    <div>
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147,
        }}
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
        >
          <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
          <Geographies geography="/features.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  stroke="#E4E5E6"
                  strokeWidth={0.5}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none",
                    },
                    hover: {
                      fill: "#D6D6DA",
                      outline: "none",
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>
          {countries.map(({ country, longitude, latitude, name }) => (
            <Marker
              key={name}
              coordinates={[longitude, latitude]}
              className="marker"
            >
              <circle
                r={
                  suicide_rates[year].find(
                    ({ country: srCountry, gender: srGender }) =>
                      srCountry === name && srGender === gender
                  )
                    ? suicide_rates[year].find(
                        ({ country: srCountry }) => srCountry === name
                      ).suicideRate /
                      2 /
                      position.zoom
                    : 0
                }
                fillOpacity={
                  mental_healthcare_workers[year].find(
                    ({ country: srCountry }) => srCountry === name
                  )
                    ? mental_healthcare_workers[year].find(
                        ({ country: srCountry }) => srCountry === name
                      ).workers / position.zoom
                    : 0
                }
                strokeWidth={0.5}
                onMouseEnter={() => {
                  console.log(country);
                }}
              />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
      <div className="controls">
        zoom:
        <button onClick={handleZoomIn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button onClick={handleZoomOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        change gender:
        <select
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
          }}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="both">All</option>
        </select>
        {gender}
      </div>
    </div>
  );
};

export default memo(Map);
