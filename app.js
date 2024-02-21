// Importing required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// Creating Express application
const app = express();

// Configuring multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Setting up multer middleware
const upload = multer({ storage: storage });

// Using body parser middleware for JSON
app.use(bodyParser.json());

// Using cors middleware for all domains
app.use(cors());

// Creating an array to store temporary data
let data = [
  { id: 1, name: 'JavaScript', popularity: 9.8 },
  { id: 2, name: 'Python', popularity: 9.5 },
  { id: 3, name: 'Java', popularity: 8.7 },
  { id: 4, name: 'C#', popularity: 8.2 },
  { id: 5, name: 'PHP', popularity: 7.9 }
];

// Endpoint to get all data
app.get('/data', (req, res) => {
  res.json(data);
});

// Endpoint to get data by id
app.get('/data/:id', (req, res) => {
  let id = req.params.id;
  let item = data.find(d => d.id == id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Data not found' });
  }
});

// Endpoint to add new data
app.post('/data', (req, res) => {
  let newData = req.body;
  data.push(newData);
  res.json({ message: 'Data added successfully' });
});

// Endpoint to update data by id
app.put('/data/:id', (req, res) => {
  let id = req.params.id;
  let updatedData = req.body;
  let index = data.findIndex(d => d.id == id);
  if (index >= 0) {
    data[index] = updatedData;
    res.json({ message: 'Data updated successfully' });
  } else {
    res.status(404).json({ message: 'Data not found' });
  }
});

// Endpoint to delete data by id
app.delete('/data/:id', (req, res) => {
  let id = req.params.id;
  let index = data.findIndex(d => d.id == id);
  if (index >= 0) {
    data.splice(index, 1);
    res.json({ message: 'Data deleted successfully' });
  } else {
    res.status(404).json({ message: 'Data not found' });
  }
});

// Endpoint to handle file upload
app.post('/upload', upload.single('avatar'), (req, res) => {
  console.log(req.file);
  res.send('File uploaded successfully');
});

// Using express.static middleware for static files
app.use(express.static('public'));

// Running server on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
