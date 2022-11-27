// Import JSON from suicide_rates.json
import codes from "../codes.json" assert { type: "json" };
import facilities from "../facilities.json" assert { type: "json" };
import data from "../data.json" assert { type: "json" };

import * as fs from "node:fs/promises";

const new_data = [];

data.forEach((d) => {
  const countryCode = codes.find(({ name }) => name === d.country);
  const facilityInfo = facilities.find(
    ({ country }) => country === countryCode?.code ?? "no"
  );

  new_data.push({
    ...d,
    facilityCount: facilityInfo ? facilityInfo.facilityCount : 0,
  });
});

fs.writeFile("data.json", JSON.stringify(new_data), (err) => {
  if (err) throw err;
});
