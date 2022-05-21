const PORT = 8000;
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express()

app.listen(8000, () => console.log(`Server is running on port ${PORT}`))

app.use(cors())

var weatherKey = process.env.REACT_APP_OPENWEATHER_API_KEY
var unsplashKey= process.env.REACT_APP_UNSPLASHED_API_KEY

app.get('/weather', (req,res) => {
    const query = req.query.query

    var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${weatherKey}&units=metric`

    console.log(req.query.query)
    axios.get(weatherUrl).then(response => {
        res.json(response.data)
    }).catch((error)=>{
        console.log(error)
    })
})

app.get('/photo', (req,res) => {
    const query = req.query.query

    var backgroundUrl = `https://api.unsplash.com/search/photos/?client_id=${unsplashKey}&query=${query}`

    axios.get(backgroundUrl).then(response => {
        res.json(response.data)
    }).catch((error)=>{
        console.log(error)
    })
})


