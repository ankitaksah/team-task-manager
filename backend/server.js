const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();


// MIDDLEWARE
app.use(cors());
app.use(express.json());


// DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));


// ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);


// TEST ROUTE
app.get('/', (req, res) => {
  res.send('API Running');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});