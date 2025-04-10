const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Atlas connection string
const dbURI = "mongodb+srv://sheetaldash52:sheetaluni123@cluster0.i2mcn.mongodb.net/portal";

// Connect to MongoDB Atlas
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// User Schema
const userSchema = new mongoose.Schema({
  users: [
    {
      id: String,
      password: String,
      role: String
    }
  ]
});

const User = mongoose.model('User ', userSchema);

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


// Event Schema
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true }
});

const Event = mongoose.model('Event', eventSchema);


// Notification Schema
const notificationSchema = new mongoose.Schema({
  text: { type: String, required: true },
  link: { type: String, required: true },
});

const Notification = mongoose.model('Notification', notificationSchema);



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


// Activity Schema
const activitySchema = new mongoose.Schema({
  facultyId: { type: String, required: true, unique: true },
  roles: [
    {
      roleName: { type: String, required: true },
      activities: [
        {
          name: { type: String, required: true },
          url: { type: String, required: true },
        },
      ],
    },
  ],
});

const Activity = mongoose.model('Activity', activitySchema);


// Announcement Schema
const announcementSchema = new mongoose.Schema({
  year: { type: String, required: true },
  branch: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const Announcement = mongoose.model('Announcement', announcementSchema);



//TeachingInfo Schema

const teachingInfoSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  teachingInfo: [String],
  teachingTT: { type: String },
  yearlyCalendar: { type: String },
  teachingSyllabus: [
    {
      branch: { type: String, required: true },
      syll: { type: String, required: true },
    },
  ],
});

const TeachingInfo = mongoose.model('TeachingInfo', teachingInfoSchema);


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



// Handle login requests
app.post('/login', async (req, res) => {
  const { id, password, role } = req.body;

  console.log('Received login attempt with id:', id, 'role:', role);

  try {
    const userDoc = await User.findOne();

    if (!userDoc) {
      return res.status(404).json({ success: false, message: 'No users found in the database' });
    }

    console.log('All users in the database:', userDoc.users);

    // Find the user with matching id and role
    const user = userDoc.users.find(user => user.id === id && user.role === role);

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found or invalid role' });
    }

    console.log('User found:', user);

    if (!user.password.startsWith('$2a$')) {
      console.error('Password is not hashed. Please ensure passwords are hashed in the database.');
      return res.status(500).json({ success: false, message: 'Server error: Password not hashed' });
    }

    // Compare the plain-text password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      console.log('Password match successful for user:', id);
      res.json({ success: true, message: 'Login successful' });
    } else {
      console.log('Invalid password for user:', id);
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Faculty creates an announcement
app.post('/api/announcements', async (req, res) => {
  const { year, branch, title, description, postedBy } = req.body;

  if (!year || !branch || !title || !description) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const newAnnouncement = new Announcement({ year, branch, title, description, postedBy });
    await newAnnouncement.save();
    res.status(201).json({ success: true, message: 'Announcement posted successfully' });
  } catch (error) {
    console.error('Error posting announcement:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Students fetch announcements
app.get('/api/announcements', async (req, res) => {
  const { year, branch } = req.query;

  if (!year || !branch) {
    return res.status(400).json({ success: false, message: 'Year and branch are required' });
  }

  try {
    const announcements = await Announcement.find({ year, branch }).sort({ postedAt: -1 });
    res.json({ success: true, announcements });
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});



// API endpoint to get student data by ID
app.get('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findOne({ id: req.params.id });
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
    res.json(student);
  } catch (error) {
    console.error('Error fetching student data:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// API endpoint to get all events
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find(); // Fetch all events
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// API endpoint to get all notifications
app.get('/api/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// API endpoint to get faculty data by ID
app.get('/api/faculty/:id', async (req, res) => {
  try {
    const faculty = await Faculty.findOne({ id: req.params.id });
    if (!faculty) return res.status(404).json({ success: false, message: 'Faculty not found' });
    res.json(faculty);
  } catch (error) {
    console.error('Error fetching faculty data:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Endpoint to fetch activities by faculty ID
app.get('/api/activities/:id', async (req, res) => {
  try {
    const activity = await Activity.findOne({ facultyId: req.params.id });

    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activities not found for this faculty' });
    }

    // Return the faculty ID and associated roles with their activities
    res.json({
      success: true,
      facultyId: activity.facultyId,
      roles: activity.roles, // Return the roles and activities for the faculty
    });
  } catch (error) {
    console.error('Error fetching activity data:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
// Endpoint to fetch teaching info by faculty ID
app.get('/api/teachinginfo/:id', async (req, res) => {
  try {
    const teachingInfo = await TeachingInfo.findOne({ id: req.params.id });

    if (!teachingInfo) {
      return res.status(404).json({ success: false, message: 'Teaching information not found' });
    }

    res.json(teachingInfo);
  } catch (error) {
    console.error('Error fetching teaching info:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Endpoint to get staff data by ID
app.get('/api/staff/:id', async (req, res) => {
  try {
    const staff = await Staff.findOne({ id: req.params.id });
    if (!staff) return res.status(404).json({ success: false, message: 'Staff not found' });
    res.json(staff);
  } catch (error) {
    console.error('Error fetching staff data:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// Start the server
app.listen(8081, () => {
  console.log("Listening on port 8081...");
});
