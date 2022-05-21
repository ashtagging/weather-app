import React, {useState, useEffect} from 'react';
import axios from 'axios'

export default function Search(){
    // require('dotenv').config()

    const [background,setBackground] = useState("https://images.unsplash.com/photo-1499346030926-9a72daac6c63?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTAxfHxza3l8ZW58MHx8MHx8&auto=format&fit=crop&w=500");
    const [query, setQuery] = useState("");
    const [weatherData, setWeatherData] = useState("");
    const [weatherIcon, setWeatherIcon] = useState("");
    // const [localTime, setLocalTime] = useState("");
   
    const search = event => {
        if(event.key === "Enter"){

            axios.get("http://localhost:8000/photo", {params: {query}}).then(response => {
                setBackground(response.data.results[0].urls.raw)
            })

            axios.get("http://localhost:8000/weather", {params: {query}}).then(response => {

                // var num = new Date().getTime()+((response.data.timezone*1000))
                // var newTime = new Date(num)
                // setLocalTime(`Local Time: ${newTime.getHours()}:${newTime.getMinutes()}`);
                setWeatherData(response.data)
                setWeatherIcon(response.data.weather[0].icon)
            }).catch((error)=>{
                console.log(error)
            })
            setQuery("");  
        }
    }

    useEffect(() => {
        document.querySelector("body").style.backgroundImage = `url(${background})`
        document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${weatherIcon}.png`  
    },[background,weatherIcon])

    return(
        <div className="container">
            <div className="search">
                <input 
                onChange={event => setQuery(event.target.value)} 
                onKeyPress={search} 
                value={query} 
                type="text"  
                placeholder="Search for a place" 
                className="search-bar"/>
            </div>
            <div className="information">
                <h1 className="location">{weatherData.name}</h1>
                {weatherData.main ? <h2 className="temperature">{Math.round(weatherData.main.temp)}°C</h2> : null} 
                {weatherData.main ? <h3 className="description">{weatherData.weather[0].main}</h3> : null}
                <img src="" alt="" className="icon" />
                {/* <h4 className="localtime">{localTime}</h4> */}
                {weatherData.main ? <p className="wind">Wind speed: {weatherData.wind.speed} km/h</p> : null}
                {weatherData.main ? <p className="humidity">Humidity: {weatherData.main.humidity}%</p> : null}
            </div>
        </div>
    )
}
