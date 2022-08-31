const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/dbConfig');
const server = require('./config/server');
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
  const foundUser = Users.findOne(reqBody, (err, data) => {
    console.log(data);
    if (err) {
      console.log(`Error on getting user from DB: ${err}`);
      res.send(`Error on getting user from DB: ${err}`);
    } else {
      res.send(data);
    }
  });
});

app.listen(server.port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on port: ${server.port}!`);
  }
});
