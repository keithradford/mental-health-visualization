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

export default function BubbleChart({ gender }) {
  const chartData = {
    datasets: data.map(({ totalWorkers, suicideRate, country }) => ({
      label: country,
      data: [{ x: totalWorkers, y: suicideRate[gender], r: 8 }],
      backgroundColor:
        totalWorkers === 0
          ? "rgba(235, 77, 53, 0.649)"
          : "rgba(53, 162, 235, 0.5)",
    })),
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
      },
    },
  };

  return <Bubble options={options} data={chartData} />;
}
