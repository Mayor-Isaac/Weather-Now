import React, { useEffect, useState } from "react";
import { fetchWeatherApi } from "openmeteo";
import LocationCard from "./LocationCard";

export default function Data({ queryCoords, tempUnit, windSpeedUnit, precipitationUnit }) {
  const [weatherData, setWeatherData] = useState(null);

  const [latitude, longitude] = queryCoords;

  useEffect(() => {
    const loadWeather = async () => {
      const params = {
        latitude: queryCoords[0],
        longitude: queryCoords[1],
        daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"],
        hourly: "temperature_2m",
        current: [
          "temperature_2m",
          "apparent_temperature",
          "relative_humidity_2m",
          "precipitation",
          "wind_speed_10m",
        ],
        timeformat: "unixtime",
        temperature_unit: tempUnit,
        wind_speed_unit: windSpeedUnit,
        precipitation_unit: precipitationUnit,
      };

      const url = "https://api.open-meteo.com/v1/forecast";
      const responses = await fetchWeatherApi(url, params);
      const response = responses[0];

      console.log("Weather API Response:", response);

      const latitude = response.latitude();
      const longitude = response.longitude();
      const elevation = response.elevation();
      const utcOffsetSeconds = response.utcOffsetSeconds();

      // console.log(
      //   `\nCoordinates: ${latitude}°N ${longitude}°E`,
      //   `\nElevation: ${elevation}m asl`,
      //   `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`
      // );

      const current = response.current();
      const hourly = response.hourly();
      const daily = response.daily();

      const data = {
        current: {
          time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
          temperature_2m: current.variables(0).value(),
          apparent_temperature: current.variables(1).value(),
          relative_humidity_2m: current.variables(2).value(),
          precipitation: current.variables(3).value(),
          wind_speed_10m: current.variables(4).value(),
        },
        hourly: {
          time: Array.from(
            { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() },
            (_, i) =>
              new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
          ),
          temperature_2m: hourly.variables(0).valuesArray(),
        },
        daily: {
          time: Array.from(
            { length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() },
            (_, i) =>
              new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
          ),
          temperature_2m_max: daily.variables(0).valuesArray(),
          temperature_2m_min: daily.variables(1).valuesArray(),
          weather_code: daily.variables(2).valuesArray(),
        },
      };

      setWeatherData(data);
    };

    loadWeather();
  }, [latitude, longitude]);

  if (!weatherData) return <div>Loading...</div>;

  console.log("Weather Data:", weatherData);

  return (
    <div>
      <LocationCard city="New York" Country="USA" date={new Date()} tempUnit={tempUnit} tempValue={weatherData?.current.temperature_2m} icon="weather" />
    </div>
  );
}
