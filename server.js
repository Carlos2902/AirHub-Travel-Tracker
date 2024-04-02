const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const multer = require('multer');
const path = require('path'); 
const fs = require('fs');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const session = require('express-session');
app.set('view engine', 'ejs')

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
  }));
  // Parse JSON bodies
  app.use(express.json());
  
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
  app.set("views", "./views");
  app.use(expressLayouts);
  app.set("layout", "./layouts/layout");
  app.set("view engine", "ejs");
  
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDirectory)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
  
  const upload = multer({ storage: storage });
  
  // Route to render the upload form
  app.get('/upload', (req, res) => {
    res.render('upload', { title: 'Send a File to Moon' });
  });
  
  // Handle the file upload
  app.post('/upload', upload.single('image'), (req, res) => {
    const uploadedFile = req.file;
  
    if (!uploadedFile) {
      return res.status(400).send('No file uploaded.');
    }
  
    console.log('Uploaded file:', uploadedFile);
  
    // Update homepageData to include the path to the uploaded image
    homepageData.uploadedImage = `/uploads/${uploadedFile.filename}`;
  
    res.redirect('/'); 
  });
  
  const uploadDirectory = 'public/uploads';
  
  // Create uploads directory if it doesn't exist
  if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
  }

  //Copy the connection from MongoDB into here
const DB = `mongodb+srv://airhub:YHRaYf9v6s53GUtt@cluster0.fjg8mda.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

let Schema = mongoose.Schema;

// Home page
app.get('/', (req, res) => {
  res.render('index/index');
});

// Flights route
app.get('/flights', (req, res) => {
  res.render('flights/flights');
});

// Weather route
app.get('/weather', (req, res) => {
  res.render('weather/weather'); 
});

// Flight radar route
app.get('/flightradar', (req, res) => {
  res.render('flight-radar/flight-radar'); 
});

// Amenities route
app.get('/amenities', (req, res) => {
  res.render('amenities/amenities'); 
});

// Signin route under /account
app.get('/account', (req, res) => {
  res.render('account/signin'); 
});

// Signup route under /account
app.get('/account/signup', (req, res) => {
  res.render('account/signup'); 
});

// FAQs route
app.get('/faqs', (req, res) => {
  res.render('FAQ/faq'); 
});


app.listen(HTTP_PORT, ()=>{
    console.log(`server listening on: ${HTTP_PORT}`)
})
