const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "abhiisagoodb$oy";

// Route 1: create a user using: POST "/api/auth/createuser". No Login Required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").notEmpty(),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
    body("Imagesrc", "Enter a valid ImageSrc").notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success: false, error: "User with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        Imagesrc: req.body.Imagesrc
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      res.json({ success: true, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 2: authenticate a user using: POST "/api/auth/login". No Login Required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      res.json({ success: true, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route to get user by email
router.get("/user", async (req, res) => {
  // Extract the email parameter from the query string
  const { email } = req.query;

  try {
    // Attempt to find a user with the given email in the database
    const user = await User.findOne({ email });

    // If no user is found, return a 404 error response
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // If user found, return user data
    res.json({ success: true, user });
  } catch (error) {
    // Handle errors that occur during the database query or processing
    console.error("Error fetching user by email:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


module.exports = router;
