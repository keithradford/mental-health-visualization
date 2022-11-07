import logo from "./logo.svg";
import "./App.css";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];
const data1 = [65, 59, 80, 81, 56, 55, 40];
const data2 = [28, 48, 40, 19, 86, 27, 90];
export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: data1,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: data2,
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
function LineChart() {
  return (
    <div className="w-[50%]">
      <Line options={options} data={data} />
    </div>
  );
}

export default LineChart;
