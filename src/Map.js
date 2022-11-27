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
import { Modal } from "./modal";

const Map = ({
  gender,
  position,
  setPosition,
  handleZoomIn,
  handleZoomOut,
}) => {
  const [countryData, setCountryData] = useState({
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

  function handleMoveEnd(position) {
    setPosition(position);
  }

  return (
    <>
      <div>
        <ComposableMap
          projectionConfig={{
            rotate: [-10, 0, 0],
            scale: 147,
          }}
          className="max-w-4xl min-h-[500px] rounded-t-lg bg-white"
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
                      ? data.find(
                          ({ country: srCountry }) => srCountry === name
                        ).totalWorkers / 219
                      : 1
                  }
                  strokeWidth={0.5}
                  onMouseEnter={() => {
                    console.log(country);
                  }}
                  onClick={() => {
                    setIsOpen(true);
                    const countryInfo = data.find(
                      ({ country: mCountry }) => mCountry === name
                    );
                    setCountryData({
                      country: countryInfo.country,
                      Nurses: parseFloat(countryInfo.nurses),
                      Psychiatrists: parseFloat(countryInfo.psychiatrists),
                      Psychologists: parseFloat(countryInfo.psychologists),
                      SocialWorkers: parseFloat(countryInfo.socialWorkers),
                      year: countryInfo.year,
                      totalWorkers: countryInfo.totalWorkers,
                      suicideRate: {
                        male: countryInfo.suicideRate.male,
                        female: countryInfo.suicideRate.female,
                        both: countryInfo.suicideRate.both,
                      },
                    });
                  }}
                />
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>
      <div className="grid bg-white w-fit px-10 py-3 rounded-b-lg">
        <div className="flex flex-col">
          <div className="text-xl font-bold">Legend</div>
          <table className="table-auto">
            <tr>
              <td className="pl-8">
                <div className="w-[20px] h-[20px] bg-red-500 rounded-full"></div>
              </td>
              <td>
                <div>No data on mental healthcare workers available</div>
              </td>
            </tr>
            <tr>
              <td className="pl-8">
                <div className="w-[20px] h-[20px] bg-blue-700 rounded-full"></div>
              </td>
              <td>
                <div>Data on mental healthcare workers available</div>
              </td>
            </tr>
            <tr>
              <td className="pr-3 pl-5">
                <div className="flex items-center">
                  <div className="w-[10px] h-[10px] bg-gray-700 rounded-full"></div>
                  <div className="w-[15px] h-[15px] bg-gray-700 rounded-full"></div>
                  <div className="w-[20px] h-[20px] bg-gray-700 rounded-full"></div>
                </div>
              </td>
              <td>
                <div>Suicide rate per 100,000 people</div>
              </td>
            </tr>
            <tr>
              <td className="px-3">
                <div className="flex items-center">
                  <div className="w-[20px] h-[20px] bg-gray-700 rounded-full opacity-10"></div>
                  <div className="w-[20px] h-[20px] bg-gray-700 rounded-full opacity-50"></div>
                  <div className="w-[20px] h-[20px] bg-gray-700 rounded-full opacity-100"></div>
                </div>
              </td>
              <td>
                <div>Mental health care workers per 100,000 people</div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <Modal
        data={countryData}
        gender={gender}
        isOpen={isOpen}
        setIsOpen={(val) => setIsOpen(val)}
      />
    </>
  );
};

export default memo(Map);
