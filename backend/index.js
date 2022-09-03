const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/dbConfig');
const serverConfig = require('./config/serverConfig');
const mongoose = require('mongoose');
const Users = require('./models/userModel');

const app = express();
mongoose
  .connect(dbConfig.MONGODB_URL)
  .then(data => console.log('MongoDB is connected.'))
  .catch(err => console.log(`Error while connecting to MONGO DB: ${err}`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/api/login', (req, res) => {
  const reqBody = req.body;
  Users.findOne(reqBody, (err, data) => {
    console.log(data);
    if (err) {
      console.log(`Error on getting user from DB: ${err}`);
      res.send(`Error on getting user from DB: ${err}`);
      return;
    }

    // If data exist use data
    res.send(data || 'User not found.');
  });
});

app.post('/api/register', async (req, res) => {
  const reqBody = req.body;
  // console.log('register user data: ', reqBody);
  Users.findOne(reqBody, async (err, data) => {
    console.log(data);
    if (err) {
      console.log(`Error on register user: ${err}`);
      res.send(err);
      return;
    }

    if (data) {
      res.send(`User already exist: ${data.username}`);
    } else {
      const newUser = new Users(reqBody);
      const saveNewUser = await newUser.save();
      console.log(saveNewUser);
      res.send(saveNewUser || 'User not registered.');
    }
  });
});

app.listen(serverConfig.port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(serverConfig.serverRunningMessage);
  }
});
