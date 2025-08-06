const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('./models/admin'); // assuming you've added Admin model
const auth = require('./middleware/auth');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/contactForm')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Mongoose Schema
const ContactSchema = new mongoose.Schema({
  email: String,
  location: String,
  comments: String,
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', ContactSchema);

// POST endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ message: 'Contact saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving contact', error });
  }
});


// For testing, you can create an admin manually in the DB with hashed password
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ message: 'Admin not found' });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ adminId: admin._id }, 'yourSecretKey', { expiresIn: '1h' });
  res.json({ token });
});

// Get all contacts
app.get('/api/admin/contacts', auth, async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

// app.get('/api/admin/contacts', auth, async (req, res) => {
//   const contacts = await Contact.find();
//   res.json(contacts);
// });

// Delete a contact
app.delete('/api/admin/contact/:id', auth, async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: 'Contact deleted' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});