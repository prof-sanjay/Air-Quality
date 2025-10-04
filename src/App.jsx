import React, { useState } from 'react';

const calculateAQI = (congestionLevel, hdVPercent, distanceMeters) => {
  const cLevel = Number(congestionLevel) || 0;
  const hdvP = Number(hdVPercent) || 0;
  const distM = Number(distanceMeters) || 0;

  const congestionFactor = cLevel / 100;
  const hdVFactor = hdvP / 100;
  const baseAQI = 30;

  let pm25Base = 0;
  let no2Base = 0;

  pm25Base += 15 * hdVFactor;
  no2Base += 30 * hdVFactor;
  no2Base += 20 * congestionFactor;
  pm25Base += 8 * Math.sqrt(congestionFactor);

  let distanceDecay = 1 - Math.min(1, distM / 150);
  distanceDecay = Math.pow(distanceDecay, 2);

  const pm25 = (pm25Base * distanceDecay) + (baseAQI / 3);
  const no2 = (no2Base * distanceDecay) + (baseAQI / 3);

  const aqiPM25 = Math.round(pm25 * 5 + baseAQI * 0.5);
  const aqiNO2 = Math.round(no2 * 4 + baseAQI * 0.5);

  const finalAQI = Math.max(aqiPM25, aqiNO2);
  const dominantPollutant = finalAQI === aqiPM25 ? 'PM2.5' : 'NO2';

  let status = 'Good';
  if (finalAQI > 50 && finalAQI <= 100) status = 'Moderate';
  if (finalAQI > 100) status = 'Unhealthy';

  return { finalAQI, dominantPollutant, status };
};

const App = () => {
  const [congestionLevel, setCongestionLevel] = useState('50');
  const [hdVPercent, setHdvPercent] = useState('15');
  const [distanceMeters, setDistanceMeters] = useState('25');

  const initialResults = calculateAQI('50', '15', '25');
  const [finalAQI, setFinalAQI] = useState(initialResults.finalAQI);
  const [dominantPollutant, setDominantPollutant] = useState(initialResults.dominantPollutant);
  const [status, setStatus] = useState(initialResults.status);

  const handleCalculate = () => {
    const results = calculateAQI(congestionLevel, hdVPercent, distanceMeters);
    setFinalAQI(results.finalAQI);
    setDominantPollutant(results.dominantPollutant);
    setStatus(results.status);
  };

  const handleInput = (setter) => (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setter(value);
  };

  return (
    <div>
      <h1>AQI Simulator</h1>

      <div>
        <h2>Input Parameters</h2>

        <div>
          <label>Traffic Congestion Level (%):</label>
          <input 
            type="text"
            value={congestionLevel}
            onChange={handleInput(setCongestionLevel)}
            placeholder="0 to 100"
          />
        </div>

        <div>
          <label>Heavy Vehicle Percentage (%):</label>
          <input 
            type="text"
            value={hdVPercent}
            onChange={handleInput(setHdvPercent)}
            placeholder="0 to 100"
          />
        </div>

        <div>
          <label>Distance from Road Edge (m):</label>
          <input 
            type="text"
            value={distanceMeters}
            onChange={handleInput(setDistanceMeters)}
            placeholder="0 to 200"
          />
        </div>

        <button onClick={handleCalculate}>Calculate AQI</button>
      </div>

      <div>
        <h2>Predicted Outputs</h2>
        <div>
          <span>Predicted AQI Score: </span>
          <span>{finalAQI} ({status})</span>
        </div>
        <div>
          <span>Dominant Pollutant: </span>
          <span>{dominantPollutant}</span>
        </div>
      </div>
    </div>
  );
};

export default App;
