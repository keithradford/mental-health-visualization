// // Import JSON from suicide_rates.json
// import suicide_rates from "../suicide_rates.json" assert { type: "json" };
// import mental_healthcare_workers from "../mental_healthcare_workers3.json" assert { type: "json" };

// import * as fs from "node:fs/promises";

// // const new_format = {
// //   totalWorkers: 0,
// //   countries: [],
// // };

// // const new_data = mental_healthcare_workers.countries.map(
// //   ({
// //     country,
// //     Nurses,
// //     Psychiatrists,
// //     Psychologists,
// //     SocialWorkers,
// //     year,
// //     totalWorkers,
// //   }) => {
// //     return {
// // const new_format2 = {
// //   countires: [],
// // };

// // // // suicide_rates.forEach(({ type, country, countryCode, year, workers }) => {
// // // //   new_format[year].push({ type, country, countryCode, workers });
// // // // });

// // for (let i = 2000; i < 2020; i++) {
// //   mental_healthcare_workers[i].forEach(
// //     ({ type, country, countryCode, year, workers }) => {
// //       if (country) {
// //         if (
// //           !new_format2.countires.find(({ country: c }) => {
// //             return c == country;
// //           }) ||
// //           !new_format2.countires.find(({ country: c, year }) => {
// //             return c == country && year == i;
// //           })
// //         ) {
// //           new_format2.countires.push({
// //             country,
// //             Psychiatrists: 0,
// //             Nurses: 0,
// //             SocialWorkers: 0,
// //             Psychologists: 0,
// //             year: i,
// //           });
// //         }

// //         const data = new_format2.countires.find(
// //           ({ country: c }) => c == country
// //         );
// //         switch (type) {
// //           case "Psychiatrists":
// //             data.Psychiatrists = workers;
// //             break;
// //           case "Nurses":
// //             data.Nurses = workers;
// //             break;
// //           case "Social workers":
// //             data.SocialWorkers = workers;
// //             break;
// //           case "Psychologists":
// //             data.Psychologists = workers;
// //             break;
// //           default:
// //             break;
// //         }
// //       }
// //     }
// //   );
// // }
// const new_format2 = {
//   totalWorkers: 0,
//   countires: [],
// };
// let max = 0;
// mental_healthcare_workers2.countires.forEach(
//   ({ country, Nurses, Psychiatrists, Psychologists, SocialWorkers, year }) => {
//     const totalWorkersForACountry =
//       parseInt(Nurses) +
//       parseInt(Psychiatrists) +
//       parseInt(Psychologists) +
//       parseInt(SocialWorkers);
//     new_format2.totalWorkers += totalWorkersForACountry;
//     new_format2.countires.push({
//       country,
//       nurses: Nurses,
//       psychiatrists: Psychiatrists,
//       psychologists: Psychologists,
//       socialWorkers: SocialWorkers,
//       year,
//       totalWorkers,
//       suicideRate: {
//         male: suicide_rates[year].find(
//           ({ gender, country: srCountry }) =>
//             gender === "male" && country === srCountry
//         )
//           ? suicide_rates[year].find(
//               ({ gender, country: srCountry }) =>
//                 gender === "male" && country === srCountry
//             ).suicideRate
//           : 0,
//         female: suicide_rates[year].find(
//           ({ gender, country: srCountry }) =>
//             gender === "female" && country === srCountry
//         )
//           ? suicide_rates[year].find(
//               ({ gender, country: srCountry }) =>
//                 gender === "female" && country === srCountry
//             ).suicideRate
//           : 0,
//         both: suicide_rates[year].find(
//           ({ gender, country: srCountry }) =>
//             gender === "both" && country === srCountry
//         )
//           ? suicide_rates[year].find(
//               ({ gender, country: srCountry }) =>
//                 gender === "both" && country === srCountry
//             ).suicideRate
//           : 0,
//       },
//     };
//   }
// );

// fs.writeFile("data.json", JSON.stringify(new_data), (err) => {
//   if (err) throw err;
// });
//       totalWorkers: totalWorkersForACountry,
//     });

//     if (totalWorkersForACountry > max) {
//       max = totalWorkersForACountry;
//     }
//   }
// );

// console.log(max);

// // fs.writeFile(
// //   "mental_healthcare_workers3.json",
// //   JSON.stringify(new_format2),
// //   (err) => {
// //     if (err) throw err;
// //   }
// // );
