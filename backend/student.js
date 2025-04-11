const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Student Schema
const studentSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    course: { type: String, required: true },
    yearOfAdmission: { type: Number, required: true },
    yearOfGraduation: { type: Number, required: true },
    academicYear: { type: String, required: true },
    hod: { type: String, required: true },
    classAdvisor: { type: String, required: true },
    classRep: { type: String, required: true },
    studentRep: { type: String, required: true },
    fathersName: { type: String, required: true },
    mothersName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    alternatePhone: { type: String, required: true },
    category: { type: String, required: true },
    prn: { type: String, required: true },
    abcId: { type: String, required: true },
    email: { type: String, required: true },
    course1: { type: String, required: true },
    course2: { type: String, required: true },
    course3: { type: String, required: true },
    course4: { type: String, required: true },
    course5: { type: String, required: true },
    course6: { type: String, required: true },
    lab1: { type: String, required: true },
    lab2: { type: String, required: true },
    lab3: { type: String, required: true },
    lab4: { type: String, required: true },
    lab5: { type: String, required: true },
    c1att: { type: String, required: true },
    c2att: { type: String, required: true },
    c3att: { type: String, required: true },
    c4att: { type: String, required: true },
    c5att: { type: String, required: true },
    l1att: { type: String, required: true },
    l2att: { type: String, required: true },
    l3att: { type: String, required: true },
    l4att: { type: String, required: true },
    l5att: { type: String, required: true }
  });
  
  
  const Student = mongoose.model('Student', studentSchema);



// Routes
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findOne({ id: req.params.id });
    if (!student) return res.status(404).send('Student not found');
    res.json(student);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;


