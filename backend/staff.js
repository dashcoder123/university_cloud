const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


// Staff Schema
const staffSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    yearOfJoining: { type: Number, required: true },
    highestEducationQualification: { type: String, required: true },
    department: { type: String, required: true },
    role: { type: String, required: true },
    workType: { type: String, required: true },
    position: { type: String, required: true },
    totalWorkYears: { type: Number, required: true },
    fathersName: { type: String, required: true },
    mothersName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    alternatePhone: { type: String, required: true },
    residentialAddress: { type: String, required: true },
    email: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    nationality: { type: String, required: true },
    password: { type: String, required: true }
  });
  
  const Staff = mongoose.model('Staff', staffSchema);

  // Endpoint to get staff data by ID
  router.get('/:id', async (req, res) => {
    try {
      const staff = await Staff.findOne({ id: req.params.id });
      if (!staff) return res.status(404).json({ success: false, message: 'Staff not found' });
      res.json(staff);
    } catch (error) {
      console.error('Error fetching staff data:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });

module.exports = router;
