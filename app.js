const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoute = require('./api/routes/product');
const userRoute = require('./api/routes/user');
const stageContentRoute = require('./api/routes/stageContent');
const aboutUsContent = require('./api/routes/aboutUs')
const servicesContent = require('./api/routes/services')
const brandsContent = require('./api/routes/brands')
const app = express(); 

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://kristianatrupja:kRtR-202209!@cluster0.v0cdl.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', (err) => {
  console.log('Connection failed:', err);
});

mongoose.connection.on('connected', () => {
  console.log('Database connected...');
});

app.use('/product', productRoute);
app.use('/user', userRoute);
app.use('/stage-content', stageContentRoute);
app.use('/about-us', aboutUsContent)
app.use('/services', servicesContent)
app.use('/brands', brandsContent)

app.use((req, res, next) => {
  res.status(400).json({
    error: 'Bad request',
  });
});

module.exports = app;
