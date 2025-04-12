let mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/tmspro');

let userSchema = new mongoose.Schema({
  user_id: Number,
  txt_email: String,
  txt_pass: String
});

module.exports = mongoose.model('customer', userSchema);
