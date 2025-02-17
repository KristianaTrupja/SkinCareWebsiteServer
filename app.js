const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoute = require('./api/routes/product');
const cushionsRoute = require('./api/routes/cushions');
const eyesRoute = require('./api/routes/eyes');
const foundationRoute = require('./api/routes/foundations');
const lipRoute = require('./api/routes/lipProducts');
const paletesRoute = require('./api/routes/paletes');
const accessoriesRoute = require('./api/routes/accessories');
const userRoute = require('./api/routes/user');
const stageContentRoute = require('./api/routes/stageContent');
const aboutUsContent = require('./api/routes/aboutUs')
const servicesContent = require('./api/routes/services')
const brandsContent = require('./api/routes/brands')
const ratingRoute = require('./api/routes/reviews')
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
app.use('/cushions', cushionsRoute);
app.use('/eyes', eyesRoute);
app.use('/foundation', foundationRoute);
app.use('/lips', lipRoute);
app.use('/paletes', paletesRoute);
app.use('/accessories', accessoriesRoute);
app.use('/user', userRoute);
app.use('/stage-content', stageContentRoute);
app.use('/about-us', aboutUsContent)
app.use('/services', servicesContent)
app.use('/brands', brandsContent)
app.use('/reviews',ratingRoute)

app.use((req, res, next) => {
  res.status(400).json({
    error: 'Bad request',
  });
});

module.exports = app;
