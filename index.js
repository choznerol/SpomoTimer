const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.promise = global.Promise; // fix the Mongoose deprecation warnings.
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();
app.use(bodyParser.json());
app.use(
  cookieSession({
    // extract data from cookie and assign to req.session property
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Hi there');
});
require('./routes/authRoutes')(app);
require('./routes/todoRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
