let express = require('express');
let app = express();
let mongoose = require('mongoose');
let members = require('./connection');  
let AdminTask=require('./connection1')
const jwt = require('jsonwebtoken');
let cors = require('cors');
let bodyparser = require('body-parser');

app.use(cors());
app.use(express.urlencoded({extended:false}))

app.use(bodyparser.json());

app.get('/',(req,res)=>{
    res.json("Home page")
})

const SECRET_KEY = '123@';

app.post('/create', async (req, res) => {
  let { user_id,txt_email, txt_pass } = req.body;
  
  let data = new members({
    user_id,
    txt_email,
    txt_pass
    
  });
  // console.log(data)
  let result = await data.save();
  res.json(result);
});


app.post('/login', async (req, res) => {
  const { txt_email, txt_pass } = req.body;
  
  const user = await members.findOne({ txt_email });
  
  if (user && user.txt_pass === txt_pass) {
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

app.post('/api/tasks', (req, res) => {
  const {
    task_id,
    task_title,
    task_description,
    task_status,
    task_due_date,
    task_priority,
    task_email
  } = req.body;

  if (!task_id || !task_title || !task_email) {
    return res.status(400).json({ message: 'Task ID, Title, and Email are required' });
  }

  const newTask = new AdminTask({
    task_id,
    task_title,
    task_description,
    task_status,
    task_due_date,
    task_priority,
    task_email,
  });

  newTask.save()
    .then(savedTask => {
      res.json({ message: 'Task created successfully', task: savedTask });
    })
    .catch(err => {
      res.status(500).json({ message: 'Error creating task', error: err.message });
    });
});

app.get('/api/tasks', (req, res) => {
  AdminTask.find()
    .then(tasks => {
      res.json(tasks);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error fetching tasks', error: err.message });
    });
});



app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;

  console.log("Delete request for task_id:", id);

  AdminTask.deleteOne({ task_id: id })
    .then(result => {
      if (result.deletedCount > 0) {
        res.json({ message: 'Task deleted successfully' });
      } else {
        res.status(404).json({ message: 'Task not found or already deleted' });
      }
    })
    
});



app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params; 
  const { task_email, task_status, task_due_date } = req.body;

  console.log("Update request received for task_id:", id);
  console.log("Data to update:", req.body);

  AdminTask.findOneAndUpdate(
    { task_id: id }, 
    { task_email, task_status, task_due_date }, 
    { new: true } 
  )
    .then(updatedTask => {
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json({ message: 'Task updated successfully', task: updatedTask });
    })
    
});


app.listen(1000, () => {
  console.log("Server started")
});






