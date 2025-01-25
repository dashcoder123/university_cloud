const express = require('express'); 
const cors = require('cors'); 
const mongoose = require('mongoose'); 

const app = express(); 

app.use(cors());
app.use(express.json());  

// MongoDB Atlas connection string
const dbURI = "mongodb+srv://sheetaldash52:sheetaluni123@cluster0.i2mcn.mongodb.net/y";

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
  academicYear: { type: String, required: true},
  hod: { type: String, required: true},
  classAdvisor: { type: String, required: true},
  classRep: { type: String, required: true},
  studentRep: { type: String, required: true},
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
  // Add other fields as necessary
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

// Handle login requests
app.post('/login', async (req, res) => {
  const { id, password, role } = req.body;

  console.log('Received login attempt with id:', id, 'password:', password, 'role:', role);

  try {
    const userDoc = await User.findOne();  // Fetch the document containing the array of users

    if (userDoc) {
      console.log('ID:', id, 'Password:', password, 'Role:', role);
      console.log('All users in the database:', userDoc.users); // Log the users array

      // Search for the user within the "users" array, matching id, password, and role
      const user = userDoc.users.find(user => 
        user.id === id &&  
        user.password === password && 
        user.role === role
      );
      
      console.log('Found user:', user);

      if (user) {
        res.json({ success: true, message: 'Login successful' });
      } else {
        res.status(401).json({ success: false, message: 'Invalid credentials or role' });
      }
    } else {
      res.status(404).json({ success: false, message: 'User  not found in the database' });
    }
  } catch (err) {
    console.error('Error during login:', err);
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

// Start the server
app.listen(8081, () => {
  console.log("Listening on port 8081...");
});