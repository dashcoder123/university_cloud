const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
  const { email, password, role } = req.body;
  
  console.log(`Email: ${email}, Password: ${password}, Role: ${role}`);

    res.json({ success: true, message: 'Login successful' });
  
});

// Start the server
app.listen(8081, () => {
  console.log("Listening on port 8081...");
});
