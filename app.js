const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {unless} = require('express-unless');
const {authenticateRoutes} = require("./config/unlessRoute");
const { authenticate } = require('./middlewares/authMiddleware');
const path = require("path")
const routes = require('./routes'); 

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


authenticate.unless = unless;
app.use(authenticate.unless(authenticateRoutes))

// Routes

app.use('/', routes); 

// Health check
app.get('/', (req, res) => {
  res.send('Bug and Feature Tracking System API is running');
});

module.exports = app;
