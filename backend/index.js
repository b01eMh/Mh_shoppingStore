const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dbConfig = require('./config/dbConfig');
const serverConfig = require('./config/serverConfig');
const Users = require('./models/userModel');
const Product = require('./models/productModel');
const products = require('./fakeDb/products.json');
const Emails = require('./models/emailModel');

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

// contact message
app.post('/api/send-message', async (req, res) => {
  const reqBody = req.body;

  // add to DB
  const newMessage = new Emails(reqBody);
  const saveNewMessage = await newMessage.save();

  // nodemailer
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
    from: `${reqBody.firstName} ${reqBody.lastName} <${reqBody.email}>`, // sender address
    to: 'onlineShop, office@onlineShop.com', // list of receivers
    // subject: 'Activate account', // Subject line
    // text: '', // plain text body
    html: `
          <p>
            ${reqBody.message}
          </p>
        `, // html body
  });

  console.log('Preview URL:', nodemailer.getTestMessageUrl(info));

  res.send(saveNewMessage || 'Message dont saved.');
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

// add my product
app.post('/api/product/add', (req, res) => {
  const reqBody = req.body;
  Product.findOne(reqBody, async (error, data) => {
    if (error) {
      const errorMsg = `Error on adding product: ${error}`;
      console.log(errorMsg);
      res.send(errorMsg);
    }
    if (data) {
      res.send('Product already exist.');
    } else {
      const newProduct = new Product(reqBody);
      const saveNewProduct = await newProduct.save();
      console.log('Saved product ->', saveNewProduct);
      res.send(saveNewProduct || 'Product not saved');
    }
  });
});

// get my products
app.get('/api/product/my-adds/:userId', (req, res) => {
  const id = req.params.userId;
  Product.find({ userId: id }, (error, data) => {
    if (error) {
      console.log(error);
      res.send(error);
    }
    res.send(data);
  });
});

// get my product
app.get('/api/product/myAd/:myProdId', (req, res) => {
  const prodId = req.params.myProdId;

  Product.findOne({ _id: prodId }, (error, data) => {
    if (error) {
      console.log(error);
      res.send(error);
    }
    res.send(data);
  });
});

// update product
app.put('/api/product/save/:myProdId', (req, res) => {
  const prodId = req.params.myProdId;
  Product.updateOne({ _id: prodId }, req.body, (error, data) => {
    if (error) {
      console.log(error);
      res.send(error);
    }
    res.send(data);
  });
});

// delete my product
app.delete('/api/product/delete/:myProdId', (req, res) => {
  const prodId = req.params.myProdId;
  Product.deleteOne({ _id: prodId }, error => {
    if (error) {
      console.log(error);
      res.send(error);
    }
    res.send('Product deleted.');
  });
});

app.listen(serverConfig.port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(serverConfig.serverRunningMessage);
  }
});
