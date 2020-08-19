require('dotenv').config()

const express = require('express');
const app = express();

const mongoose = require('mongoose');

// CONNECT TO DATABASE
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.on('open', () => console.log('Connected to Database'));

app.use(express.json());

// ROUTES
const pizzaRouter = require('./routes/pizzaRouter');
app.use('/pizza', pizzaRouter)


app.listen(3000, () => console.log("Server running on port 3000"));