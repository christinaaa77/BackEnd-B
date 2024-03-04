const express = require('express');
const users = require('./users');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(cors({ origin: 'http://127.0.0.1:5500' }));

app.use((req, res, next) => {
  res.status(404).json({ message: "Data user tidak ditemukan" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Masukan data yang akan diubah" });
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:name', (req, res) => {
  const { name } = req.params;
  const user = users.find(user => user.Name.toLowerCase() === name.toLowerCase());
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "Data user tidak ditemukan" });
  }
});

app.post('/users', (req, res) => {
  const { Id, Name } = req.body;
  if (!Id || !Name) {
    res.status(400).json({ message: "Masukan data yang akan diubah" });
  } else {
    users.push({ Id, Name });
    res.status(201).json({ message: "User ditambahkan dengan sukses" });
  }
});

app.put('/users/:name', (req, res) => {
  const { name } = req.params;
  const { Id, Name } = req.body;
  const userIndex = users.findIndex(user => user.Name.toLowerCase() === name.toLowerCase());
  if (userIndex !== -1 && Id && Name) {
    users[userIndex] = { Id, Name };
    res.json({ message: "User diperbarui dengan sukses" });
  } else {
    res.status(404).json({ message: "Data user tidak ditemukan" });
  }
});

app.delete('/users/:name', (req, res) => {
  const { name } = req.params;
  const userIndex = users.findIndex(user => user.Name.toLowerCase() === name.toLowerCase());
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.json({ message: "User dihapus dengan sukses" });
  } else {
    res.status(404).json({ message: "Data user tidak ditemukan" });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
