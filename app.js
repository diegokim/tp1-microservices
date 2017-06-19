const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const statusRoutes = require('./routes/statusRoutes');
const usersRoutes = require('./routes/usersRoutes');
const activitiesRoutes = require('./routes/activitiesRoutes');
const database = require('./wrappers/database');

// eslint-disable-next-line
const mockData = require('./mocks/mockData')

const app = express();

const port = process.env.PORT || 8080; // EN GENERAL TODAS LAS VARIABLES DE CONFIGURACION VAN EN UN ARCHIVO CONFIG.JSON

database.connect();

//  Middleware cors
app.use(cors());

//  Body parser middleware
app.use(bodyParser.json());

//  Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//  User routes
app.use(usersRoutes);

//  Status routes
app.use(statusRoutes);

// Activities routes
app.use(activitiesRoutes);

//  Setting the invalid enpoint message for any other route
app.get('*', (req, res) => {
  res.status(400).json({ message: 'Invalid endpoint' });
});

//  Start server on port
app.listen(port, () => {
  console.log('Server started at port ' + port);
});

// mockData.startMocking(database);
