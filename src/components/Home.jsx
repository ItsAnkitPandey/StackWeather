import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ScrollReveal from 'scrollreveal'


const Home = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [query, setQuery] = useState("New Delhi");
    const [currentDay, setCurrentDay] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiKey = "dbd6790bfe056745abf6a3b907bf0eb5";
                const encodedQuery = encodeURIComponent(query);
                // Fetch weather data from Weatherstack API
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodedQuery}&appid=${apiKey}&units=metric`);
                setWeatherData(response.data);
                console.log(response.data)
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };
        fetchData();

        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const today = new Date();
        const dayIndex = today.getDay();
        setCurrentDay(daysOfWeek[dayIndex]);

        /*===== SCROLL REVEAL ANIMATION =====*/
        const sr = ScrollReveal({
            origin: 'top',
            distance: '60px',
            duration: 2000,
            delay: 200,
            // reset: true
        });

        sr.reveal('.h-container .', { delay: 400 })
        sr.reveal('.details, .weather-details ', { delay: 400 })
        sr.reveal(' .input', { delay: 600 })
        sr.reveal('.templ', { delay: 400 })
    
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
                    <div > <i className="fa-solid templ fa-temperature-low" style={{ marginRight: '5px' }}></i>Sunshine is delicious & Rain is refreshing. </div>
                    <Link to=" ">Stack Weather</Link>
                </div>
                <div className="weather-details">
                    {query === "" ? (
                        <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>Enter Your Location</p>
                    ) : (!weatherData || !weatherData.main) ? (<p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>Loading.....</p>) : (
                        <>
                            <div className="location">  {weatherData.name} , {weatherData.sys.country}</div>
                            <div className="data">
                                <div>
                                    {(weatherData.weather[0].main === 'Clouds') ? (<i className='fa-solid fa-cloud  fa-4x'></i>) :
                                        (weatherData.weather[0].main === 'Haze' ||
                                            weatherData.weather[0].main === 'Mist' ||
                                            weatherData.weather[0].main === 'Smoke' ||
                                            weatherData.weather[0].main === 'Dust' ||
                                            weatherData.weather[0].main === 'Fog' ||
                                            weatherData.weather[0].main === 'Sand' ||
                                            weatherData.weather[0].main === 'Ash' ||
                                            weatherData.weather[0].main === 'Squall' ||
                                            weatherData.weather[0].main === 'Tornado')
                                            ? (<i className='fa-solid fa-smog fa-4x'></i>) :
                                            (weatherData.weather[0].main === 'Rain') ? (<i className='fa-solid fa-cloud-rain fa-4x'></i>) :
                                                (weatherData.weather[0].main === 'Snow') ? (<i className='fa-solid fa-snowflake'></i>) :
                                                    (weatherData.weather[0].main === 'Thunderstorm') ? (<i className='fa-solid fa-cloud-bolt fa-4x'></i>) :
                                                        (weatherData.weather[0].main === 'Drizzle') ? (<i class="fa-thin fa-cloud-drizzle fa-4x"></i>) :
                                                            (weatherData.weather[0].main === 'Clear') ? (<i className='fa-solid fa-cloud-sun fa-4x'></i>) :
                                                                (<p>Icon Not Found..</p>)
                                    }
                                    <p>{weatherData.weather[0].main}</p>
                                </div>
                                <h2 className="temprature">{weatherData.main.temp}°C</h2>
                                <div>
                                    <p>Wind: {weatherData.wind.speed} km/h</p>
                                    <p>Humidity: {weatherData.main.humidity}</p>
                                    <p>Pressure: {weatherData.main.pressure}</p>
                                </div>
                            </div>
                            <div className="forecast">
                                <p className="day">{currentDay}</p>
                                {(weatherData.weather[0].main === 'Clouds') ? (<i className=' fc fa-solid fa-cloud'></i>) :
                                    (weatherData.weather[0].main === 'Haze' ||
                                        weatherData.weather[0].main === 'Mist' ||
                                        weatherData.weather[0].main === 'Smoke' ||
                                        weatherData.weather[0].main === 'Dust' ||
                                        weatherData.weather[0].main === 'Fog' ||
                                        weatherData.weather[0].main === 'Sand' ||
                                        weatherData.weather[0].main === 'Ash' ||
                                        weatherData.weather[0].main === 'Squall' ||
                                        weatherData.weather[0].main === 'Tornado') ? (<i className='fa-solid fa-smog'></i>) :
                                        (weatherData.weather[0].main === 'Rain') ? (<i className=' fc fa-solid fa-cloud-rain'></i>) :
                                            (weatherData.weather[0].main === 'Snow') ? (<i className=' fc fa-solid fa-snowflake'></i>) :
                                                (weatherData.weather[0].main === 'Thunderstorm') ? (<i className=' fc fa-solid fa-cloud-bolt'></i>) :
                                                    (weatherData.weather[0].main === 'Drizzle') ? (<i class=" fc fa-thin fa-cloud-drizzle"></i>) :
                                                        (weatherData.weather[0].main === 'Clear') ? (<i className=' fc fa-solid fa-cloud-sun'></i>) :
                                                            (<p>Icon Not Found..</p>)
                                }
                                <p className="day-temp">{weatherData.main.temp}°C</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home