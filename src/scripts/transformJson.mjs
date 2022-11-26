// Import JSON from suicide_rates.json
import suicide_rates from "../mental_healthcare_workers.json" assert { type: "json" };
import mental_healthcare_workers from "../mental_healthcare_workers.json" assert { type: "json" };
import mental_healthcare_workers2 from "../mental_healthcare_workers2.json" assert { type: "json" };

import * as fs from "node:fs/promises";

// Create JSON with an empty array for each year from 2000-2019
// const new_format = {
//   2000: [],
//   2001: [],
//   2002: [],
//   2003: [],
//   2004: [],
//   2005: [],
//   2006: [],
//   2007: [],
//   2008: [],
//   2009: [],
//   2010: [],
//   2011: [],
//   2012: [],
//   2013: [],
//   2014: [],
//   2015: [],
//   2016: [],
//   2017: [],
//   2018: [],
//   2019: [],
// };

// const new_format2 = {
//   countires: [],
// };

// // // suicide_rates.forEach(({ type, country, countryCode, year, workers }) => {
// // //   new_format[year].push({ type, country, countryCode, workers });
// // // });

// for (let i = 2000; i < 2020; i++) {
//   mental_healthcare_workers[i].forEach(
//     ({ type, country, countryCode, year, workers }) => {
//       if (country) {
//         if (
//           !new_format2.countires.find(({ country: c }) => {
//             return c == country;
//           }) ||
//           !new_format2.countires.find(({ country: c, year }) => {
//             return c == country && year == i;
//           })
//         ) {
//           new_format2.countires.push({
//             country,
//             Psychiatrists: 0,
//             Nurses: 0,
//             SocialWorkers: 0,
//             Psychologists: 0,
//             year: i,
//           });
//         }

//         const data = new_format2.countires.find(
//           ({ country: c }) => c == country
//         );
//         switch (type) {
//           case "Psychiatrists":
//             data.Psychiatrists = workers;
//             break;
//           case "Nurses":
//             data.Nurses = workers;
//             break;
//           case "Social workers":
//             data.SocialWorkers = workers;
//             break;
//           case "Psychologists":
//             data.Psychologists = workers;
//             break;
//           default:
//             break;
//         }
//       }
//     }
//   );
// }
const new_format2 = {
  totalWorkers: 0,
  countires: [],
};

mental_healthcare_workers2.countires.forEach(
  ({ country, Nurses, Psychiatrists, Psychologists, SocialWorkers, year }) => {
    const totalWorkersForACountry =
      parseInt(Nurses) +
      parseInt(Psychiatrists) +
      parseInt(Psychologists) +
      parseInt(SocialWorkers);
    new_format2.totalWorkers += totalWorkersForACountry;
    new_format2.countires.push({
      country,
      Nurses,
      Psychiatrists,
      Psychologists,
      SocialWorkers,
      year,
      totalWorkers: totalWorkersForACountry,
    });
  }
);

fs.writeFile(
  "mental_healthcare_workers3.json",
  JSON.stringify(new_format2),
  (err) => {
    if (err) throw err;
  }
);
