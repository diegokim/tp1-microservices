const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const usersRoutes = require('./routes/usersRoutes');
const database = require('./wrappers/database');

const app = express();

const port = process.env.PORT || 8080;

database.connect();

//  Middleware cors
app.use(cors());

//  Body parser middleware
app.use(bodyParser.json());

//  Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//  Index route
app.get('/', (req, res) => {
  res.send('Invalid endpoint');
});

//  User routes
app.use('/users', usersRoutes);

//  Setting the invalid enpoint message for any other route
app.get('*', (req, res) => {
  res.send('Invalid endpoint');
});

//  Start server on port
app.listen(port, () => {
  console.log('Server started at port ' + port);
});
