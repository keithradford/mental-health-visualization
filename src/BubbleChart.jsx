import React from "react";
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

        facilityCount,
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
          data: [
            {
              x: workerToShow,
              y: suicideRate[gender],
              r: ((facilityCount + 1) * 1) ^ 0.6,
            },
          ],
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
    maintainAspectRatio: false,
    responsive: true,
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
        suggestedMax: 50,
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
      <div style={{ maxHeight: "60vh", minHeight: "60vh", minWidth: "100vh" }}>
        <Bubble
          options={options}
          data={chartData}
          className="rounded-t-lg bg-white mx-200"
          style={{
            minHeight: "100%",
            maxHeight: "100%",
            minWidth: "100%",
          }}
        />
      </div>
      <div>
        <div className="grid bg-white w-fit px-10 py-3 rounded-b-lg hi">
          <div className="text-xl font-bold">Legend</div>
          <table className="table-auto">
            <tr>
              <td className="pl-6">
                <div className="w-[20px] h-[20px] bg-red-500 rounded-full"></div>
              </td>
              <td>
                <div>No data on mental healthcare workers available</div>
              </td>
            </tr>
            <tr>
              <td className="pl-6">
                <div className="w-[20px] h-[20px] bg-blue-700 rounded-full"></div>
              </td>
              <td>
                <div>Data on mental healthcare workers available</div>
              </td>
            </tr>
            <tr>
              <td className="pl-6">
                <div className="w-[20px] h-[20px] bg-yellow-300 rounded-full"></div>
              </td>
              <td>
                <div>Current country selected</div>
              </td>
            </tr>
            <tr>
              <td className="px-3">
                <div className="flex items-center">
                  <div className="w-[10px] h-[10px] bg-gray-700 rounded-full"></div>
                  <div className="w-[15px] h-[15px] bg-gray-700 rounded-full"></div>
                  <div className="w-[20px] h-[20px] bg-gray-700 rounded-full"></div>
                </div>
              </td>
              <td>
                <div>
                  Mental health outpatient facilities per 100,000 people
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}
