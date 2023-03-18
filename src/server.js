const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/technicianDB', { useNewUrlParser: true, useUnifiedTopology: true });

const technicianSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  nickname: String,
  phoneNumber: String,
  experience: String,
  occupation: String,
  imageUrl: String,
});

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

const Technician = mongoose.model('Technician', technicianSchema);
const User = mongoose.model('User', userSchema);

app.get('/api/technicians', async (req, res) => {
  const technicians = await Technician.find();
  res.json(technicians);
});

app.post('/api/users/signup', async (req, res) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (password !== user.password) {
      res.status(401).json({ message: 'Invalid password' });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
