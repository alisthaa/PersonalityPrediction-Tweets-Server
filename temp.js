const mongoose = require("mongoose");
const User = require("./models/user"); // Import the User model

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/tweetData", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// GET a specific user by ID
app.get("/fetchUser", fetchUser, (req, res) => {
  res.json(res.user);
});

// Middleware to get a user by ID
async function fetchUser(req, res, next) {
  const username = req.body.username;
  if (!username) {
    return res.status(400).json({ message: "Username parameter is required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.user = user.type;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { fetchUser };
