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
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none",
                    },
                    hover: {
                      // darker grey when hovering over a country
                      fill: "#B7B7B7",
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
            <Marker key={name} coordinates={[longitude, latitude]}>
              <circle
                r={
                  suicide_rates[year].find(
                    ({ country: srCountry }) => srCountry === name
                  )
                    ? suicide_rates[year].find(
                        ({ country: srCountry }) => srCountry === name
                      ).suicideRate /
                      3 /
                      position.zoom
                    : 0
                }
                fill="#F53"
                fillOpacity={
                  mental_healthcare_workers[year].find(
                    ({ country: srCountry }) => srCountry === name
                  )
                    ? mental_healthcare_workers[year].find(
                        ({ country: srCountry }) => srCountry === name
                      ).workers / position.zoom
                    : 0
                }
                stroke="#F53"
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
        change year:
        <button onClick={() => setYear(year + 1)}>
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
        <button onClick={() => setYear(year - 1)}>
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
        {year}
      </div>
    </div>
  );
};

export default memo(Map);
