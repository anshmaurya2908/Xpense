require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {signUser} = require('./service/auth');

// passport google
const passport = require('passport');
require('./passport');
const session = require('express-session');

//path
const path = require('path');

// connection with mongoDB
const {connectToMongoDB} = require('./connection');

// importing routes
const homeRoute = require('./routes/Home');
const userRoute = require('./routes/LoginSignup');
const expenseRoute = require('./routes/Expense');
const contactRoute = require('./routes/Contact');
const {restrictedToLoggedinUserOnly} = require('./middlewares/auth');
const getUserProfile = require('./routes/User');
const getUserContact = require('./routes/User');
const getUserExpenses = require('./routes/User');
const logoutRoute = require('./routes/Logout');
//multer image upload
const imageUploadRoute = require('./routes/Upload');
//claude Anthropic AI
const anthropicAIRouter = require('./routes/AnthropicAI');
//NodeMailer
const passwordResetRoute = require('./routes/PasswordReset');

// connect to MongoDB
connectToMongoDB(process.env.MONGODB_URI);

// initializing express as app
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use('/images', express.static(path.join(__dirname, '/upload/images')));

// middlewares for google authentication
app.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/', homeRoute);
app.use('/user', userRoute);
app.use('/user', logoutRoute);
app.use('/', expenseRoute);
app.use('/', contactRoute);
app.use('/', imageUploadRoute);
app.use('/user', getUserProfile);
app.use('/user', getUserContact);
app.use('/user', getUserExpenses);
app.use('/api', anthropicAIRouter);
app.use('/', passwordResetRoute);

// app.get('/check', restrictedToLoggedinUserOnly, (req, res) => {
//     return res.json({ message: "Middleware is Working" });
// })

// // Google authentication
app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}), () => {});

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {failureRedirect: process.env.FAILURE_REDIRECT_URI}),
  // this function is to assign JWT Token to the user
  async function (req, res) {
    const user = req.user;
    const token = await signUser(user);
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });

    // on successful Login it will be redirected to the frontend expense page
    res.redirect(process.env.EXPENSE_PAGE_REDIRECT_URI);
  }
);

app.get('/login/success', async (req, res) => {
  const user = req.user;
  console.log('THIS IS THE TEST LOGIN SUCCESSPAGE', user);
  const boolValue = true;
  return res.status(200).json({message: 'successful google login', user, boolValue});
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT} `);
});
