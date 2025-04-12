
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/tmspro')

const taskSchema = new mongoose.Schema({
  task_id: { type: Number, required: true },
  task_email: { type: String, required: true },
  task_title: { type: String, required: true },
  task_description: { type: String },
  task_status: { type: String, default: 'pending' },
  task_due_date: { type: Date },
  task_priority: { type: String, default: 'low' },
});


const Task = mongoose.model('task', taskSchema);

module.exports = Task;
