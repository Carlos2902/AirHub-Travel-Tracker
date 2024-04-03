const mongoose = require('mongoose');
// Connect to MongoDB
const connect = mongoose.connect( 'mongodb+srv://trackairhub:mYscVnRcyYlNVU09@cluster0.hnkcfcs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');


// Check database connected or not
connect.then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be Connected");
})

// Create Schema
const Loginschema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    
    },
    password: {
        type: String,
        required: true
    }
});

// Add indexing to email field for better query performance
Loginschema.index({ email: 1 });


// collection part
const collection = new mongoose.model("users", Loginschema);

module.exports = collection;
