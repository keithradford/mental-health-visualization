import React, { useState } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bubble } from "react-chartjs-2";
import data from "./data";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export default function BubbleChart({ gender, worker, countrySelected }) {
  const chartData = {
    datasets: data.map(
      ({
        totalWorkers,
        suicideRate,
        country,
        nurses,
        psychiatrists,
        psychologists,
        socialWorkers,
      }) => {
        let workerToShow;

        switch (worker) {
          case "nurses":
            workerToShow = nurses;
            break;
          case "psychiatrists":
            workerToShow = psychiatrists;
            break;
          case "psychologists":
            workerToShow = psychologists;
            break;
          case "socialWorkers":
            workerToShow = socialWorkers;
            break;
          default:
            workerToShow = totalWorkers;
            break;
        }

        return {
          label: country,
          data: [{ x: workerToShow, y: suicideRate[gender], r: 8 }],
          backgroundColor:
            countrySelected !== "all" && country === countrySelected
              ? "yellow"
              : totalWorkers === 0
              ? "rgba(235, 77, 53, 0.649)"
              : "rgba(53, 162, 235, 0.5)",
        };
      }
    ),
  };

  const options = {
    onClick: (e) => {
      console.log(e);
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          text: "Suicide rate / 100,000",
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 90,
      },
      x: {
        title: {
          text: "Amount of mental healthcare workers / 100,000",
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 250,
      },
    },
  };

  return (
    <>
      <div className="w-full flex justify-center mt-3">
        <Bubble
          options={options}
          data={chartData}
          className="max-w-4xl border-2 border-gray-300 rounded-lg bg-white"
        />
      </div>
      <div>
        <div className="flex flex-col">
          <div className="text-xl font-bold">Legends</div>
          <div className="flex items-center space-x-1">
            <div className="w-[20px] h-[20px] bg-red-500 rounded-full"></div>
            <div>No data on mental healthcare workers available</div>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-[20px] h-[20px] bg-blue-700 rounded-full"></div>
            <div>Data on mental healthcare workers available</div>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-[20px] h-[20px] bg-yellow-300 rounded-full"></div>
            <div>Current country selected</div>
          </div>
        </div>
      </div>
    </>
  );
}
