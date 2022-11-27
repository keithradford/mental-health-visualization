import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      display: false,
    },
    title: {
      display: true,
      text: "Country data per 100,000 people",
    },
  },
};

export function Modal({ data, gender, isOpen, setIsOpen }) {
  const labels = [
    "Nurses",
    "Psychiatrists",
    "Psychologists",
    "Social Workers",
    `Suicide Rate for ${gender}`,
  ];

  console.log(data);
  const countryData = {
    labels: labels,
    datasets: [
      {
        data: [
          data.Nurses,
          data.Psychiatrists,
          data.Psychologists,
          data.SocialWorkers,
          data.suicideRate[gender],
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(75, 100, 22, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(75, 100, 22, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-[9999] overflow-y-auto"
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <div className="min-h-screen px-4 text-center bg-slate-500 bg-opacity-40">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-3xl p-8 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="flex flex-wrap">
                  <Dialog.Title className="my-2 text-xl font-medium leading-6">
                    Data for {data.country}
                  </Dialog.Title>
                </div>
                <Bar options={options} data={countryData} />
                <div className="flex justify-start space-x-3 mt-5">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-gray-200 rounded-lg px-4 py-2"
                  >
                    {" "}
                    Close{" "}
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
