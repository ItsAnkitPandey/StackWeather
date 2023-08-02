import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <div className="h-container">
                <div className="details">
                    <h1>Real-Time & <br />Historical World<br/> Weather Data </h1>
                     <p>Retrieve instant, accurate weather<br/> information forany location in the world in </p>  
                    <div>Hello World </div>
                    <Link to =" ">Stack Weather</Link>
                        
                </div>
                <div className="weather-details">

                </div>
            </div>
        </div>
    )
}

export default Home