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
import data from "./data.json";
import suicide_rates from "./suicide_rates.json";
import mental_healthcare_workers from "./mental_healthcare_workers3.json";
import { Modal } from "./modal";

const Map = () => {
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [gender, setGender] = useState("both");

  const [data, setData] = useState({
    country: "",
    Nurses: "",
    Psychiatrists: "",
    Psychologists: "",
    SocialWorkers: "",
    year: "",
    totalWorkers: "",
    suicideRate: { male: "", female: "", both: "" },
  });

  const [isOpen, setIsOpen] = useState(false);

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
                  data.find(({ country: srCountry }) => srCountry === name)
                    ? Math.pow(
                        data.find(
                          ({ country: srCountry }) => srCountry === name
                        ).suicideRate[gender] /
                          1.5 /
                          position.zoom,
                        0.6
                      ) * 1.25
                    : 0
                }
                stroke="black"
                fill={
                  data.find(
                    ({ country: srCountry, totalWorkers }) =>
                      srCountry === name && totalWorkers > 0
                  )
                    ? "blue"
                    : "red"
                }
                fillOpacity={
                  data.find(
                    ({ country: srCountry, totalWorkers }) =>
                      srCountry === name && totalWorkers > 0
                  )
                    ? data.find(({ country: srCountry }) => srCountry === name)
                        .totalWorkers / 219
                    : 1
                }
                strokeWidth={0.5}
                onMouseEnter={() => {
                  console.log(country);
                }}
                onClick={() => {
                  setIsOpen(true);
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
      <Modal data={data} isOpen={isOpen} setIsOpen={(val) => setIsOpen(val)} />
    </div>
  );
};

export default memo(Map);
