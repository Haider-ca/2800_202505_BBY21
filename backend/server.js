// backend/server.js
require('dotenv').config();

const path = require('path');
const express = require('express');
const session = require('express-session');
const cors    = require('cors');
const favicon = require('serve-favicon');
const connectDB = require('./config/db');
const MongoStore = require('connect-mongo');

const authRoutes = require('./routes/auth');//add this for login features 

const app = express();
connectDB();

// serve favicon
app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));

// serve static files from public and src directories
app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.use('/src', express.static(path.join(__dirname, '..', 'src')));


// middlewares
app.use(session({
  secret:process.env.NODE_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    dbName:'PathPal',
    collectionName:'sessions'
  }),
  cookie: { 
    secure: false, 
    maxAge: 1000*60*60*24}
}))
// app.use(cors({
//   origin: 'http://localhost:5000',  // Replace with your frontend port
//   credentials: true
// }));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Home Page
app.get('/', (req, res) => {
  res.redirect('/html/map.html');
});

// static assets
app.use(
  '/css',
  express.static(path.join(__dirname, '..', 'src', 'css'))
);
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static(path.join(__dirname, '..', 'src')));

// API endpoints
app.use('/api/map', require('./map/routes/mapRoutes'));
app.use('/api/poi', require('./poi/routes/poiRoutes'));
app.use('/api/community', require('./community/routes/communityRoutes'));
app.use('/api/vote', require('./vote/routes/voteRoutes'));
app.use('/api', authRoutes);//add this for login features 
app.use('/api/profile', require('./profile/routes/profileRoutes'));

// mount directionsRoutes at /api so that GET /api/directions works
app.use('/api', require('./map/routes/directionsRoutes'));

// global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message || err);
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
