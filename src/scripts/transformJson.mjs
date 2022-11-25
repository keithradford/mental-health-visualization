// Import JSON from suicide_rates.json
import suicide_rates from "../mental_healthcare_workers.json" assert { type: "json" };
import * as fs from "node:fs/promises";

// Create JSON with an empty array for each year from 2000-2019
const new_format = {
  2000: [],
  2001: [],
  2002: [],
  2003: [],
  2004: [],
  2005: [],
  2006: [],
  2007: [],
  2008: [],
  2009: [],
  2010: [],
  2011: [],
  2012: [],
  2013: [],
  2014: [],
  2015: [],
  2016: [],
  2017: [],
  2018: [],
  2019: [],
};

suicide_rates.forEach(({ type, country, countryCode, year, workers }) => {
  new_format[year].push({ type, country, countryCode, workers });
});

fs.writeFile(
  "mental_healthcare_workers.json",
  JSON.stringify(new_format),
  (err) => {
    if (err) throw err;
  }
);
