import React, { useState } from "react";

const Weather = () => {
  const [cityName, setCityName] = useState("");
  const [humidity, setHumidity] = useState(null);
  const [country, setCountry] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState(null);

  const handleCityNameChange = (e) => {
    const newCityName = e.target.value;
    setCityName(newCityName);

    if (newCityName === "" || cityName !== newCityName) {
      setHumidity(null);
      setCountry("");
      setError(null);
    }
  };

  const humidityWeather = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=1a9da166c5f15337e4182cd4d33d62ed&q=${cityName}&aqi=no`
      );
      const data = await response.json();

      if (response.ok) {
        setHumidity(data.current.humidity);
        setCountry(data.location.country);
        setTime(data.location.localtime);
        setError(null);
      } else {
        setError(data.error.message);
        setHumidity(null);
      }
    } catch (error) {
      setError("Failed to fetch data");
      setHumidity(null);
    }
  };

  return (
    <div>
      <h1>Weather Component</h1>
      <div>
        <input
          type="text"
          placeholder="Enter City"
          value={cityName}
          onChange={handleCityNameChange}
        />
        <button onClick={humidityWeather}>Enter</button>
        {humidity !== null && (
          <div>
            {cityName} humidity: {humidity}% <br /> Country: {country} <br />{" "}
            Time: {time}
          </div>
        )}
        {error && <div>Error: {error}</div>}
      </div>
    </div>
  );
};

export default Weather;
