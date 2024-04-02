const express = require('express');
const app = express();
const path = require('path');
const HTTP_PORT = process.env.PORT || 8080;
app.set('view engine', 'ejs')


//Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

//sendFile
app.get('/',(req,res)=>{
    res.render(path.join(__dirname, '/views/home/home.ejs'));
})
// Flights route
app.get('/flights', (req,res)=>{
    res.render(path.join(__dirname, '/views/flights/flights.ejs'));
});
//weather
app.get('/weather', (req, res)=>{
    res.render(path.join(__dirname, '/views/weather/weather.ejs'));
});
//flight radar
app.get('/flightradar', (req, res)=>{
    res.render(path.join(__dirname, '/views/flight-radar/flight-radar.ejs'));
});
//amenities
app.get('/amenities', (req, res)=>{
    res.render(path.join(__dirname, '/views/amenities/amenities.ejs'));
});
//FAQS
app.get('/faqs', (req, res)=>{
    res.render(path.join(__dirname, '/views/FAQ/faq.ejs'));
});

app.listen(HTTP_PORT, ()=>{
    console.log(`server listening on: ${HTTP_PORT}`)
})
