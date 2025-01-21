
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

const userSchema = new mongoose.Schema({
  users: [
    {
      id: String, 
      password: String,
      role: String 
    }
  ]
});

const User = mongoose.model('User', userSchema);

// Handle login requests
app.post('/login', async (req, res) => {
  const { id, password, role } = req.body;

  console.log('Received login attempt with id:', id, 'password:', password, 'role:', role);

  try {
    const userDoc = await User.findOne();  // Doc containing the array of users

    if (userDoc) {
      console.log('ID:', id, 'Password:', password, 'Role:', role);

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
      res.status(404).json({ success: false, message: 'User not found in the database' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Start the server
app.listen(8081, () => {
  console.log("Listening on port 8081...");
});
