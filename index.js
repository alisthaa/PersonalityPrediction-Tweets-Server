const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user'); // Import the User model

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/tweetDataFinal', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));

// GET all users
 app.get('/users/allusers', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}); 

// GET a specific user by ID
app.get('/users', getUserByUsername, (req, res) => {
    res.json(res.user);
});

// POST a new user
app.post('/users', async (req, res) => {
    const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        posts: req.body.posts
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Middleware to get a user by ID
async function getUserByUsername(req, res, next) {
    const username = req.body.username;
    if (!username) {
        return res.status(400).json({ message: 'Username parameter is required' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.user=user.posts.split("|||")
       /* // res.user = user; */
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
