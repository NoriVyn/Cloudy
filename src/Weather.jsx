import { useState } from "react";
import './Weather.css'


function Weather(){

    const [city,setCity] = useState ('');
    const [weather,setWeather] = useState(null);
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
   ;

    const fetchWeather = async () => {
        if (!city) return;
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
          );
          const data = await res.json();
          if (data.cod === 200) {
            setWeather(data);
          } else {
            alert('City not found');
            setWeather(null);
          }
        } catch (err) {
          console.error(err);
          alert('Something happened');
        }
      };
    
    return(
        <div className="app">
        <h1>Cloudy - The Weather Website, you can trust </h1>
    
        <input type="text"
        placeholder="Enter your city"
        value={city}
        onChange={(e) => setCity(e.target.value)} />

        <button onClick={fetchWeather}>Search</button>
        
        {weather && (
        <div className="weather-card">
            <h2>{weather.name}</h2>
        <p>{weather.weather[0].description}</p>
          <p>🌡️ {Math.round(weather.main.temp)}°C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <p>{weather.main.humidity}% humidity in the air</p>
        </div>
      )}
    </div>
  );
}










export default Weather