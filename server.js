const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const path = require('path'); 
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;
const session = require('express-session');
const collection = require("./config");
const MongoClient = require('mongodb').MongoClient;

const client = new MongoClient('mongodb+srv://trackairhub:mYscVnRcyYlNVU09@cluster0.hnkcfcs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });


app.use(session({
  secret: 'your-secret-key', // Set your own secret key
  resave: false,
  saveUninitialized: false
}));

  // Parse JSON bodies
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.set('views', path.join(__dirname, 'views'));
  app.use(expressLayouts);
  app.set("layout", "./layouts/layout");
  app.set("view engine", "ejs");

//sendFile
app.get('/',(req,res)=>{
  res.render(path.join(__dirname, '/views/index/index.ejs'));
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

// Signin route under /account
app.get('/login', (req, res) => {
  res.render(path.join(__dirname, '/views/account/login.ejs'));
});

// Signup route under /account
app.get('/signup', (req, res) => {
  res.render(path.join(__dirname, '/views/account/signup.ejs'));
});

  // Register User
  app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    try {
      // Check if the username already exists in the database
      const existingUser = await collection.findOne({ email: email });

      if (existingUser) {
        res.send('Email already exists. Please choose a different email.');
      } else {
        // Hash the password using bcrypt
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert the user into the database
        await collection.create({ email: email, password: hashedPassword });

        res.send('User registered successfully.');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).send('Internal server error.');
    }
  });

  // Login user 
  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await collection.findOne({ email: email });
  
      if (!user) {
        return res.send("User not found");
      }
      
      // Compare the hashed password from the database with the plaintext password
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      
      if (!isPasswordMatch) {
        return res.send("Invalid password");
      }
      
      req.session.user = user;
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).send('Internal server error.');
    }
  });

  // Handle logout
app.post("/logout", (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
      if (err) {
          console.error('Error destroying session:', err);
          return res.status(500).send('Internal server error.');
      }
      // Redirect the user to the login page or any other page
      res.redirect('/login');
  });
});

// Define Port for Application
const port = 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});
