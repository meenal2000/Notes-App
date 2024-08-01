const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
const groupRoutes = require('./routes/groups');
const noteRoutes = require('./routes/notes');

app.use('/api/groups', groupRoutes);
app.use('/api/notes', noteRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/notes-app', { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = app;
