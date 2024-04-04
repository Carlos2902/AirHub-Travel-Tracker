const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Create a user model
const User = mongoose.model('User', userSchema);

// Connect to MongoDB Atlas
const MONGODB_URI = 'mongodb+srv://trackairhub:<password>@cluster0.hnkcfcs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((error) => {
  console.error('Error connecting to MongoDB Atlas:', error);
});

// Function to register a new user
async function registerUser(username, password) {
  try {
    // Create a new user instance
    const newUser = new User({
      username,
      password
    });

    // Save the user to the database
    const savedUser = await newUser.save();
    console.log('User registered successfully:', savedUser);
    return savedUser;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

// Example usage:
registerUser('john_doe', 'password123')
  .then(() => {
    console.log('Registration successful');
  })
  .catch(() => {
    console.log('Registration failed');
  });