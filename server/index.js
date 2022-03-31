const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

mongoose.connect('mongodb://localhost:27017/business-adultmen', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

// app.use(require('./routes'));

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
