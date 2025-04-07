const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// MongoDB Atlas connection string
const dbURI = "mongodb+srv://sheetaldash52:sheetaluni123@cluster0.i2mcn.mongodb.net/portal";

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

async function hashExistingPasswords() {
  try {
    // Connect to MongoDB Atlas
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

    // Fetch all user documents from the database
    const userDoc = await User.findOne(); // Assuming there's only one document in the 'User' collection
    if (!userDoc) {
      console.log('No users found in the database!');
      return;
    }

    // Iterate over each user in the 'users' array
    for (let i = 0; i < userDoc.users.length; i++) {
      const user = userDoc.users[i];
      
      // If the password is not already hashed, hash it
      if (!user.password.startsWith('$2a$')) {  // bcrypt hashes start with $2a$
        console.log(`Hashing password for user: ${user.id}`);
        
        // Hash the password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        // Update the user's password with the hashed password
        user.password = hashedPassword;
      }
    }

    // Save the updated user document back to the database
    await userDoc.save();
    console.log('Passwords successfully hashed and updated in the database!');
  } catch (error) {
    console.error('Error while hashing passwords:', error);
  } finally {
    mongoose.connection.close(); // Close the database connection
  }
}

// Call the function to hash existing passwords
hashExistingPasswords();
