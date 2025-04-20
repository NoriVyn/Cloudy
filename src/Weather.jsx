import { useState } from "react";

function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

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

  return (
    <div className="app flex flex-col items-center justify-center min-h-screen bg-[#9499c4]">
      <h1 className="text-3xl font-bold text-white mb-6">Cloudy - The Weather Website, you can trust</h1>

      <input
        type="text"
        placeholder="Enter your city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full max-w-md p-4 bg-[#8187b8] text-white text-xl rounded-lg mb-6 focus:outline-none"
      />

      <button
        onClick={fetchWeather}
        className="bg-sky-500/50 text-white px-6 py-3 rounded-lg hover:bg-[#42423e] transition-all"
      >
        Search
      </button>

      {weather && (
        <div className="weather-card mt-16 mb-8 bg-[#f0f0f0a1] p-16 rounded-3xl inline-block max-w-md ">
          <h2 className="text-2xl font-semibold text-center">{weather.name}</h2>
          <p className="text-center">{weather.weather[0].description}</p>
          <p className="text-center">{Math.round(weather.main.temp)}°C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
            className="mx-auto my-4 text-center"
          />
          <p>{weather.main.humidity}% humidity in the air</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
