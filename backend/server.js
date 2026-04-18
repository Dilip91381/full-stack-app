const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// 🔥 MongoDB Atlas Connection
mongoose.connect("mongodb://127.0.0.1:27017/studentManagement")
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Test route
app.get('/', (req, res) => {
  res.send('API Working');
});

// Server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});

// Schema and Model
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  course: String
});

const Student = mongoose.model('Student', studentSchema);

// Routes
// GET all students
app.get('/students', async (req, res) => {
  const data = await Student.find();
  res.json(data);
});

// POST new student
app.post('/students', async (req, res) => {
  const newStudent = new Student(req.body);
  await newStudent.save();
  res.json(newStudent);
});

// DELETE student
app.delete('/students/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});