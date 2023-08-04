import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ScrollReveal from 'scrollreveal'


const Home = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [query, setQuery] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiKey = "9faffac7c31af858ba42b0d533fe8ba4";
                const encodedQuery = encodeURIComponent(query);
                // Fetch weather data from Weatherstack API
                const response = await axios.get(`http://api.weatherstack.com/current`, {
                    params: {
                        access_key: apiKey,
                        query: encodedQuery,
                    },
                });
                setWeatherData(response.data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };
        fetchData();
        /*===== SCROLL REVEAL ANIMATION =====*/
        const sr = ScrollReveal({
            origin: 'top',
            distance: '60px',
            duration: 2000,
            delay: 200,
            reset: true
        });
        sr.reveal('.h-container .', { })
        sr.reveal('.details, .weather-details', {delay:400})
        sr.reveal('.fa-solid, .input', {delay:600})
    }, [query]); // Run the effect whenever the 'query' changes
    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };


    return (
        <div>

            <div className="h-container">
                <div className="details">
                    <form>
                        <input type="text" className='input' value={query} onChange={handleInputChange} placeholder="Enter location" />
                    </form>
                    <h1>Real-Time & <br />Historical World<br /> Weather Data </h1>
                    <p>Retrieve instant, accurate weather<br /> information forany location in the world in </p>
                    <div > <i className="fa-solid fa-temperature-low" style={{ marginRight: '5px' }}></i>Sunshine is delicious & Rain is refreshing. </div>
                    <Link to=" ">Stack Weather</Link>

                </div>
                <div className="weather-details">
                    {query === "" ? (
                        <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>Enter Your Location</p>
                    ) : (!weatherData || !weatherData.location) ? (<p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>Loading.....</p>) : (
                        <>
                            <div className="location">  {weatherData.location.name},{weatherData.location.country}</div>
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
                            <div className="forecast">
                                <p className="day">fri</p>
                                <i className='fa-solid fa-cloud'></i>
                                <p className="day-temp">12°C</p>
                            </div>
                        </>
                    )}


                </div>
            </div>
        </div>
    )
}

export default Home