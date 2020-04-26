const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

const app = express();
const PORT = process.env.PORT || 3000;

// Define paths for Express config
const Paths = {
  publicDirectory: path.join(__dirname, '../public'), // serve static files
  views: path.join(__dirname, './templates/views'),
  partials: path.join(__dirname, './templates/partials'),
};

// Setup handlebars
app.set('view engine', 'hbs');
app.set('views', Paths.views);
hbs.registerPartials(Paths.partials);

// Setup static directory to serve
app.use(express.static(Paths.publicDirectory)); // serve the index

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
  });
});

app.get('/about', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a query parameter',
    });
  }
  res.render('about');
});

app.get('/help', (req, res) => {
  res.render('help', {
    name: 'Help',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query && !req.query.address) {
    return res.send({
      error: 'You must provide a query parameter',
    });
  }
  const { address } = req.query;

  geocode(address, (error, { latitude, longitude } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        ...forecastData,
        address,
      });
    });
  });

  //   res.send({
  //     title: 'Weather',
  //     forecast: '50',
  //     address,
  //   });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help article not found',
    name: 'Kevin',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found',
    name: 'Kevin',
  });
});

app.listen(PORT, () => {
  console.log(`The server is up on port ${PORT}`);
});
