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

//Attendance Schema
const attendanceSchema = new mongoose.Schema({
  year: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  attendance: {
    type: String, 
    required: true
  }
});

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;


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

//Syllabus Schema
const syllabusSchema = new mongoose.Schema({
  courseId: { type: String, required: true, unique: true },  
  syllabusLink: { type: String, required: true },            
});

const Syllabus = mongoose.model('Syllabus', syllabusSchema);


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
  postedBy: { type: String, required: true }, 
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;

// Talk Schema
const talkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  postedBy: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Talk = mongoose.model('Talk', talkSchema);


//Faculty Community

const facultyAnnouncementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  postedBy: { type: String, required: true },
});

const FacultyAnnouncement = mongoose.model('FacultyAnnouncement', facultyAnnouncementSchema);
module.exports = FacultyAnnouncement;



//TeachingInfo Schema

const teachingInfoSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  teachingInfo: [String],
  teachingSyllabus: [String],
});

const TeachingInfo = mongoose.model('TeachingInfo', teachingInfoSchema);



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

  if (!year || !branch || !title || !description || !postedBy) {
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

app.get('/api/attendances', async (req, res) => {
  const { year, branch } = req.query;

  if (!year || !branch) {
    return res.status(400).json({ success: false, message: 'Year and branch are required' });
  }

  try {
    const attendanceRecords = await Attendance.find({ year, branch });

    if (!attendanceRecords || attendanceRecords.length === 0) {
      return res.status(404).json({ success: false, message: 'No attendance records found' });
    }

    return res.json({ success: true, attendanceRecords });
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST a new discussion post
app.post('/api/talks', async (req, res) => {
  const { title, description, postedBy } = req.body;

  if (!title || !description || !postedBy) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const newTalk = new Talk({ title, description, postedBy });
    await newTalk.save();
    res.status(201).json({ success: true, message: 'Discussion post created successfully' });
  } catch (error) {
    console.error('Error creating discussion post:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET all discussion posts
app.get('/api/talks', async (req, res) => {
  try {
    const talks = await Talk.find().sort({ timestamp: -1 }); // Sorting by timestamp in descending order (most recent first)
    res.json({ success: true, talks });
  } catch (error) {
    console.error('Error fetching discussion posts:', error);
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
    const announcements = await Announcement.find({ year, branch });
    res.json({ success: true, announcements });
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Fetch all faculty announcements
app.get('/api/faculty-announcements', async (req, res) => {
  try {
    const announcements = await FacultyAnnouncement.find(); 
    res.json({ success: true, announcements });
  } catch (error) {
    console.error('Error fetching faculty announcements:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Faculty creates an announcement
app.post('/api/faculty-announcements', async (req, res) => {
  const { title, description, postedBy } = req.body;

  if (!title || !description || !postedBy) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const newFacultyAnnouncement = new FacultyAnnouncement({ title, description, postedBy });
    await newFacultyAnnouncement.save();
    res.status(201).json({ success: true, message: 'Faculty Announcement posted successfully' });
  } catch (error) {
    console.error('Error posting faculty announcement:', error);
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

// Endpoint to fetch syllabus by course ID
app.get('/api/syllabus/:courseId', async (req, res) => {
  try {
    const syllabus = await Syllabus.findOne({ courseId: req.params.courseId });

    if (!syllabus) {
      return res.status(404).json({ success: false, message: 'Syllabus not found for this course' });
    }

    // Return the syllabus link for the course
    res.json({
      success: true,
      syllabusLink: syllabus.syllabusLink,
    });
  } catch (error) {
    console.error('Error fetching syllabus:', error);
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
    // Fetch the teaching info document for the given faculty ID
    const teachingInfo = await TeachingInfo.findOne({ id: req.params.id });

    // If no teaching info is found for the given faculty ID, return a 404 error
    if (!teachingInfo) {
      return res.status(404).json({ success: false, message: 'Teaching information not found' });
    }

    // Return the data in the required format
    const formattedTeachingInfo = {
      id: teachingInfo.id,
      teachingInfo: teachingInfo.teachingInfo,
      teachingTT: teachingInfo.teachingTT,
      teachingSyllabus: teachingInfo.teachingSyllabus
    };

    // Send the formatted data as the response
    res.json(formattedTeachingInfo);
  } catch (error) {
    console.error('Error fetching teaching info:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


app.use('/api/students', require('./student'));
app.use('/api/faculty', require('./faculty'));
app.use('/api/staff', require('./staff'));



// Start the server
app.listen(8081, () => {
  console.log("Listening on port 8081...");
});
