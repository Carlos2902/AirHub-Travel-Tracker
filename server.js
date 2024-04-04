const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const HTTP_PORT = process.env.PORT || 8080;

const User = require('./public/models/user');
const MONGODB_URI = 'mongodb+srv://trackairhub:mYscVnRcyYlNVU09@cluster0.hnkcfcs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((error) => {
  console.error('Error connecting to MongoDB Atlas:', error);
});

app.set('view engine', 'ejs')

//Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

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

app.get('/signup', (req, res)=>{
    res.render(path.join(__dirname, '/views/account/signup.ejs'));
});

app.post('/signup', async (req, res) => {
    console.log(req);
    const { username, password } = req.body;
    try {
      const newUser = new User({ username, password });
      const savedUser = await newUser.save();
      console.log('User registered successfully:', savedUser);
      res.send('User registered successfully');
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).send('Error registering user');
    }
  });

app.get('/signin', (req, res)=>{
    // res.render(path.join(__dirname, '/views/account/signin'));
    res.render(path.join(__dirname, '/views/account/signin.ejs'))
});



app.listen(HTTP_PORT, ()=>{
    console.log(`server listening on: ${HTTP_PORT}`)
})
