import React, { useState } from "react";

function App() {
  const [aqi, setAqi] = useState(null);
  const [congestion, setCongestion] = useState("");
  const [heavy, setHeavy] = useState(false);
  const [distance, setDistance] = useState("");
  const [pollutant, setPollutant] = useState("");

  function calculate() {
    let score = 30;
    let domPollutant = "PM2.5";

    if (congestion === "low"){
      score += 20;
    } else if (congestion === "medium"){
      score += 50;
    } else if (congestion === "high"){
      score += 80;
      domPollutant = "NO2";
    }

    if (heavy){
      score += 30;
      domPollutant = "NO2";
    }

    if (distance === "near"){
      score += 40;
    }
    else if (distance === "medium"){
        score += 20;

      }
    else if (distance === "far"){
      score += 5;
    }

    setAqi(score);
    setPollutant(domPollutant);
  }

  return (
    <div className="box">
      <h1>Air Quality Index Calculator</h1>

      <label>Traffic Congestion Level</label><br />
      <input type="radio" name="congestion" value="low" onChange={(e)=>setCongestion(e.target.value)} /> Low
      <input type="radio" name="congestion" value="medium" onChange={(e)=>setCongestion(e.target.value)} /> Medium
      <input type="radio" name="congestion" value="high" onChange={(e)=>setCongestion(e.target.value)} /> High
      <br /><br />

      <input type="checkbox" onChange={(e) => setHeavy(e.target.checked)} /> Heavy Vehicles are present
      <br /><br />

      <label>Distance</label>
      <select onChange={(e)=>setDistance(e.target.value)}>
        <option value="">Select</option>
        <option value="near">Near (0-50m)</option>
        <option value="medium">Medium (51-100m)</option>
        <option value="far">Far (101-200m)</option>
      </select>
      <br /><br />

      <button onClick={calculate}>Calculate</button>

        <h2>Results</h2>
        <p><b>Predicted AQI Score:</b> {aqi}</p>
        <p><b>Dominant Pollutant:</b> {pollutant}</p>
    </div>
  );
}

export default App;