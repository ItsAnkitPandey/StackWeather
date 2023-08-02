import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const Home = () => {
    const [weatherData, setWeatherData] = useState(null);
    const apiKey = "9faffac7c31af858ba42b0d533fe8ba4";
    const query = "New York"; // Replace with the desired location 
    useEffect(() => {
        const encodedQuery = encodeURIComponent(query);
        // Fetch weather data from Weatherstack API
        axios
            .get(`http://api.weatherstack.com/current`, {
                params: {
                    access_key: apiKey,
                    query: encodedQuery,
                },
            })
            .then((response) => {
                setWeatherData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
            });
    }, [query]); // Run the effect whenever the 'query' changes

    return (
        <div>
        
            <div className="h-container">
                <div className="details">
                    <h1>Real-Time & <br />Historical World<br /> Weather Data </h1>
                    <p>Retrieve instant, accurate weather<br /> information forany location in the world in </p>
                    <div>Hello World </div>
                    <Link to=" ">Stack Weather</Link>

                </div>
                <div className="weather-details">
                    {(!weatherData || !weatherData.location) ? ( <p style={{display:'flex', alignItems:'center', justifyContent:'center', width:'100%', height:'100%'}}>Loading.....</p>): (
                        <>
                        <div className="location">  {weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}</div>
                    <div className="data">
                        <div>
                            <img src={weatherData.current.weather_icons} alt="" />
                            <p>{weatherData.current.weather_descriptions[0]}</p>
                        </div>
                        <h2 className="temprature">{weatherData.current.temperature}°C</h2>
                        <div>
                            <p>Wind: {weatherData.current.wind_speed} km/h</p>
                            <p>Precip: {weatherData.current.precip}</p>
                            <p>Pressure: {weatherData.current.pressure}</p>
                        </div>
                    </div>
                        </>
                    )}
                    

                </div>
            </div>
        </div>
    )
}

export default Home