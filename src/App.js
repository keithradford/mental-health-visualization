import { useState } from "react";
import "./App.css";
import BubbleChart from "./BubbleChart";
import Map from "./Map";

function App() {
  const [showMap, setShowMap] = useState(true);
  const [gender, setGender] = useState("both");

  return (
    // align center
    <div>
      <h1>CSC 411</h1>
      <h2>The importance of mental healthcare workers</h2>
      <button onClick={() => setShowMap(true)}>Map</button>
      <button onClick={() => setShowMap(false)}>Chart</button>
      change gender:
      <select
        value={gender}
        onChange={(e) => {
          setGender(e.target.value);
        }}
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="both">All</option>
      </select>
      {gender}
      {showMap ? <Map gender={gender} /> : <BubbleChart gender={gender} />}
    </div>
  );
}

export default App;
