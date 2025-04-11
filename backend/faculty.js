const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


// Faculty Schema
const facultySchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    yearOfJoining: { type: Number, required: true },
    highestEducationQualification: { type: String, required: true },
    department: { type: String, required: true },
    specializationAreas: [{ type: String, required: true }],
    teachingExperience: { type: Number, required: true },
    workType: { type: String, required: true },
    position: { type: String, required: true },
    totalWorkYears: { type: Number, required: true },
    fathersName: { type: String, required: true },
    mothersName: { type: String, required: true },
    spousesName: { type: String },
    phoneNumber: { type: String, required: true },
    alternatePhone: { type: String, required: true },
    residentialAddress: { type: String, required: true },
    email: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    nationality: { type: String, required: true },
  });
  
  const Faculty = mongoose.model('Faculty', facultySchema);


// API endpoint to get faculty data by ID
router.get('/:id', async (req, res) => {
    try {
      const faculty = await Faculty.findOne({ id: req.params.id });
      if (!faculty) return res.status(404).json({ success: false, message: 'Faculty not found' });
      res.json(faculty);
    } catch (error) {
      console.error('Error fetching faculty data:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });


  module.exports = router;