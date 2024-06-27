// server.js or index.js
require('dotenv').config();
const express = require('express');
const connectToMongoDB = require('./db');
const fetchFoodItems = require('./fetchData');
const userRoutes = require('./routes/createUser');
const authRoutes = require('./routes/UserLogin');
const dataRoutes = require('./routes/Displaydata')
const checkoutRoutes = require('./routes/checkout')
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

connectToMongoDB()
  .then(fetchFoodItems)
  .catch(error => console.error(error));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/',dataRoutes)
app.use('/api/',checkoutRoutes)

app.get('/', (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
