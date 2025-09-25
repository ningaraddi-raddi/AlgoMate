const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, sparse: true },
  password: { type: String }, // hashed password for local auth
  name: { type: String },
  provider: { type: String, default: 'local' }, // 'local' or 'google'
  googleId: { type: String, index: true, sparse: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
