// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const passport = require('passport');

// const User = require('../models/User');
// const authMiddleware = require('../middleware/auth');

// const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// /* REGISTER */
// router.post('/register', async (req, res) => {
//   const { name, email, password } = req.body;
//   if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

//   try {
//     let user = await User.findOne({ email });
//     if (user) return res.status(400).json({ message: 'User already exists' });

//     const salt = await bcrypt.genSalt(10);
//     const hashed = await bcrypt.hash(password, salt);

//     user = new User({ name, email, password: hashed, provider: 'local' });
//     await user.save();

//     const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     return res.json({ token });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: 'Server error' });
//   }
// });

// /* LOGIN */
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

//   try {
//     const user = await User.findOne({ email });
//     if (!user || !user.password) return res.status(400).json({ message: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     return res.json({ token });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: 'Server error' });
//   }
// });

// /* GET current user (protected) */
// router.get('/me', authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password -__v');
//     return res.json({ user });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: 'Server error' });
//   }
// });

// /* GOOGLE OAUTH - start */
// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// /* GOOGLE OAUTH - callback */
// router.get('/google/callback',
//   passport.authenticate('google', { session: false, failureRedirect: `${CLIENT_URL}/login` }),
//   (req, res) => {
//     // req.user is the user document attached in passport verify callback
//     const user = req.user;
//     const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     // Option A: set cookie (recommended for security)
//     // res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600000, sameSite: 'lax' });
//     // return res.redirect(`${CLIENT_URL}/home`);

//     // Option B: redirect with token in query (simple; be careful in production)
//     return res.redirect(`${CLIENT_URL}/oauth2/redirect?token=${token}`);
//   });

// module.exports = router;










/* REGISTER */
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashed, provider: 'local' });
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // ✅ Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
      maxAge: 3600000, // 1 hour
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
    });

    return res.json({ message: 'Registration successful' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

/* LOGIN */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

  try {
    const user = await User.findOne({ email });
    if (!user || !user.password) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // ✅ Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
    });

    return res.json({ message: 'Login successful' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

