const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mern_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected');
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Schema and Model used to reside here

app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// HTTP request logger ... optional
app.use(morgan('tiny'));
app.use('/api', routes);

// Routes used to reside here
// e.g., app.get('/api', (req, res) => {})

app.listen(PORT, console.log(`Server is starting at ${PORT}`));