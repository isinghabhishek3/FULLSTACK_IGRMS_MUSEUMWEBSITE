const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Stuff = require("../models/Stuffs");
const User = require("../models/User");

// Route to fetch stuff data by ID
router.get('/fetchstuff/:stuffId', async (req, res) => {
  try {
    const stuffId = req.params.stuffId;

    // Query the database to find the stuff by its ID
    const stuff = await Stuff.findById(stuffId);

    if (!stuff) {
      return res.status(404).json({ success: false, message: 'stuff not found' });
    }

    // If stuff is found, send it in the response
    res.status(200).json({ success: true, stuff });
  } catch (error) {
    console.error('Error fetching stuff:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Route to add credit information
router.post("/addstuffs", async (req, res) => {
  try {
    const { name, state, description, videoSrc, imageSrc } = req.body;

    // Ensure all required fields are provided
    if (!name || !state || !description || !videoSrc || !imageSrc) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newstuff = new Stuff({
      name,
      state,
      description,
      videoSrc,
      imageSrc
    });

    const savedStuff = await newstuff.save();
    res.json({
      success: true,
      message: "Stuff added successfully",
      stuff: savedStuff,
    });
  } catch (error) {
    console.error("Error adding stuff:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Route to fetch stuff data, either all or by state
router.get('/:state?', async (req, res) => {
  const { state } = req.params;

  try {
    const query = state ? { state } : {};
    const stuffs = await Stuff.find(query);

    if (stuffs.length === 0) {
      return res.status(404).json({ success: false, message: `No stuff found${state ? ` in ${state}` : ''}` });
    }

    res.status(200).json({ success: true, stuffs });
  } catch (error) {
    console.error('Error fetching stuff:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Route to delete a stuff by ID
router.delete("/stuffstodelete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const stuff = await Stuff.findByIdAndDelete(id); // Use the correct model name

    if (!stuff) {
      return res.status(404).json({ success: false, message: "Stuff not found" });
    }

    // If stuff found and deleted successfully
    res.json({ success: true, message: "Stuff deleted successfully" });
  } catch (error) {
    console.error("Error deleting stuff by ID:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Route to get all stuffs
router.get("/allstuffs", async (req, res) => {
  try {
    const stuffs = await Stuff.find();
    res.json({ success: true, stuffs });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route to update a stuff
router.put("/updatestuff/:id", async (req, res) => {
  const { id } = req.params;
  const {
    category,
    coursetitle,
    coursecode,
    ntr,
    version,
    lecture,
    practical,
    tutorial,
    project,
    credit,
    coursevenue,
    coursetype,
    courseoption,
    coursesemester,
    FslotId,
    SslotId,
    TslotId,
  } = req.body;

  try {
    let stuff = await stuff.findById(id);

    if (!stuff) {
      return res
        .status(404)
        .json({ success: false, message: "stuff not found" });
    }

    // Update stuff fields
    stuff.category = category;
    stuff.coursetitle = coursetitle;
    stuff.coursecode = coursecode;
    stuff.ntr = ntr;
    stuff.version = version;
    stuff.lecture = lecture;
    stuff.practical = practical;
    stuff.tutorial = tutorial;
    stuff.project = project;
    stuff.credit = credit;
    stuff.coursevenue = coursevenue;
    stuff.coursetype = coursetype;
    stuff.coursesemester = coursesemester;
    stuff.courseoption = courseoption;
    stuff.FslotId = FslotId || stuff.FslotId;
    stuff.SslotId = SslotId || stuff.SslotId;
    stuff.TslotId = TslotId || stuff.TslotId;

    // Save updated stuff
    stuff = await stuff.save();

    res.json({
      success: true,
      message: "stuff updated successfully",
      stuff,
    });
  } catch (error) {
    console.error("Error updating stuff:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Route to update stuff by ID
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { name, state, description, imageSrc, videoSrc } = req.body;

  try {
    const updatedStuff = await Stuff.findByIdAndUpdate(id, {
      name,
      state,
      description,
      imageSrc,
      videoSrc,
    }, { new: true });

    if (!updatedStuff) {
      return res.status(404).json({ message: 'Stuff not found' });
    }

    res.json({ message: 'Stuff updated successfully', updatedStuff });
  } catch (error) {
    console.error('Error updating stuff:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get stuff by ID
router.get("/stuffs/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const stuff = await Stuff.findById(id);

    if (!stuff) {
      return res
        .status(404)
        .json({ success: false, message: "stuff not found" });
    }

    // If stuff found, return stuff data
    res.json({ success: true, stuff });
  } catch (error) {
    console.error("Error fetching stuff by ID:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get('/getdata/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`Fetching data for ID: ${id}`);
  try {
    const stuff = await Stuff.findById(id);
    if (!stuff) {
      console.log('Stuff not found');
      return res.status(404).send({ message: 'Stuff not found' });
    }
    res.send({ stuff });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).send({ message: 'Server error' });
  }
});





// GET all available stuffs
router.get("/allAvailablestuffs", async (req, res) => {
  try {
    // Find all stuffs where available is true
    const stuffs = await stuff.find({ available: true });
    res.json({ stuffs });
  } catch (error) {
    console.error("Error fetching available stuffs:", error);
    res.status(500).json({ message: "Failed to fetch available stuffs" });
  }
});

module.exports = router;