const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dbConfig = require('./config/dbConfig');
const serverConfig = require('./config/serverConfig');
const Users = require('./models/userModel');
const products = require('./fakeDb/products.json');

const app = express();
mongoose
  .connect(dbConfig.MONGODB_URL)
  .then(data => console.log('MongoDB is connected.'))
  .catch(err => console.log(`Error while connecting to MONGO DB: ${err}`));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// enable CORS - API calls and resource sharing
app.use(cors());

// Login
app.post('/api/login', (req, res) => {
  console.log('request ->', req.body);
  const reqBody = req.body;
  Users.findOne(reqBody, (err, data) => {
    console.log(data);
    if (err) {
      console.log(`Error on getting user from DB: ${err}`);
      res.status(416).send(err);
      return;
    }

    // If data exist use data
    res.send(data || 'User not found.');
  });
});

// Register
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
      // console.log(saveNewUser);

      // mailer
      let testAccount = await nodemailer.createTestAccount();

      let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <office@onlineshop.com>', // sender address
        to: reqBody.email, // list of receivers
        subject: 'Activate account', // Subject line
        text: '', // plain text body
        html: `
          <h1>Activate account</h1>
          <p>Dear, ${reqBody.username}</p>
          <p>Please click on link below to activate your account.</p>
          <a href="http://localhost:3000/user-activate/${saveNewUser._id.toString()}" target="_blank">Activate link</a>
        `, // html body
      });

      console.log('Preview URL:', nodemailer.getTestMessageUrl(info));

      res.send(saveNewUser || 'User not registered.');
    }
  });
});

app.post('/api/complete-registration', (req, res) => {
  const userId = req.body.userId;
  Users.updateOne({ _id: userId }, { isActive: true }, (error, result) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log('activate user ->', result);
      res.send(result);
    }
  });
});

// top products for home page
app.get('/api/top-products/:top', (req, res) => {
  const topNumber = req.params.top;
  const copyProducts = [...products];
  const sorted = copyProducts.sort((a, b) => {
    return b.rating.rate - a.rating.rate;
  });
  res.send(sorted.splice(0, topNumber));
});

app.listen(serverConfig.port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(serverConfig.serverRunningMessage);
  }
});
