// Import JSON from suicide_rates.json
import suicide_rates from "../suicide_rates.json" assert { type: "json" };
import mental_healthcare_workers from "../mental_healthcare_workers3.json" assert { type: "json" };

import * as fs from "node:fs/promises";

// const new_format = {
//   totalWorkers: 0,
//   countries: [],
// };

const new_data = mental_healthcare_workers.countries.map(
  ({
    country,
    Nurses,
    Psychiatrists,
    Psychologists,
    SocialWorkers,
    year,
    totalWorkers,
  }) => {
    return {
      country,
      nurses: Nurses,
      psychiatrists: Psychiatrists,
      psychologists: Psychologists,
      socialWorkers: SocialWorkers,
      year,
      totalWorkers,
      suicideRate: {
        male: suicide_rates[year].find(
          ({ gender, country: srCountry }) =>
            gender === "male" && country === srCountry
        )
          ? suicide_rates[year].find(
              ({ gender, country: srCountry }) =>
                gender === "male" && country === srCountry
            ).suicideRate
          : 0,
        female: suicide_rates[year].find(
          ({ gender, country: srCountry }) =>
            gender === "female" && country === srCountry
        )
          ? suicide_rates[year].find(
              ({ gender, country: srCountry }) =>
                gender === "female" && country === srCountry
            ).suicideRate
          : 0,
        both: suicide_rates[year].find(
          ({ gender, country: srCountry }) =>
            gender === "both" && country === srCountry
        )
          ? suicide_rates[year].find(
              ({ gender, country: srCountry }) =>
                gender === "both" && country === srCountry
            ).suicideRate
          : 0,
      },
    };
  }
);

fs.writeFile("data.json", JSON.stringify(new_data), (err) => {
  if (err) throw err;
});
