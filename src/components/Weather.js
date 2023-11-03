import React, { useState } from "react";
import axios from "axios";


const APIkey = "6897049bd3a7b5aabf5cbd589426ebf0";

const Weather = () => {

    const [search, setSearch] = useState("");
    const [weatherData,setWeatherData] = useState(null);
    const [city, setCity] = useState("");
    

    function fetchData(search) {

        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${APIkey}`).then((response) => {
           setWeatherData(response.data);
        }).catch((err) => {
            console.log(err);
        });
    }


    function handleInput(event) {
        setSearch(event.target.value);
    }

    function handleForm(event) {
        event.preventDefault();

        if (search !== "") {
            fetchData(search);
        }
        setCity(search);
        setSearch("");
    }

   


    return (
        <div>
            <form onSubmit={handleForm}>
                <input type="text" className="search" value={search} onChange={handleInput} />
            </form>

            {
               weatherData !== null && <div className="weather">
                    <h2>{city}</h2>
                    <h2>{Math.floor(((weatherData.main.temp-273)*9/5) + 32)}°F</h2>
                    <p>{weatherData.weather[0].description}</p>
                </div>
            }

        </div>

    )
}

export default Weather;