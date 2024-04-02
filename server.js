const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const multer = require('multer');
const path = require('path'); 
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;
const session = require('express-session');
app.set('view engine', 'ejs')
const bcrypt = require('bcrypt');
const collection = require("./config");
const MongoClient = require('mongodb').MongoClient;

const client = new MongoClient('mongodb+srv://airhub:YHRaYf9v6s53GUtt@cluster0.fjg8mda.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });


  // Parse JSON bodies
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  
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
    
    // Successful login
    res.render("profile",  { user: user });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).send('Internal server error.');
  }
});



// Define Port for Application
const port = 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});
