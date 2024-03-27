const express = require("express");
const db = require("./db");
const fs = require("fs");
const app = express();
const port = 3200;


app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/students", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM students");
    res.status(200).json({
      status: "success",
      data: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


app.get("/students/:id", async (req, res) => {
  const studentId = req.params.id;
  try {
    const result = await db.query(`SELECT * FROM students WHERE id = $1`, [studentId]);
    if (result.rows.length === 0) {
      res.status(404).json({
        status: "error",
        message: "Data mahasiswa tidak ditemukan",
      });
    } else {
      res.status(200).json({
        status: "success",
        data: result.rows[0],
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


app.post("/students", async (req, res) => {
  const { name, address } = req.body;
  try {
    const result = await db.query(`INSERT INTO students (name, address) VALUES ($1, $2)`, [name, address]);
    res.status(200).json({
      status: "success",
      message: "Data mahasiswa berhasil ditambahkan",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


app.put("/students/:id", async (req, res) => {
  const studentId = req.params.id;
  const { name, address } = req.body;
  try {
    const result = await db.query(`UPDATE students SET name = $1, address = $2 WHERE id = $3`, [name, address, studentId]);
    res.status(200).json({
      status: "success",
      message: "Data mahasiswa berhasil diperbarui",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


app.delete("/students/:id", async (req, res) => {
  const studentId = req.params.id;
  try {
    const result = await db.query(`DELETE FROM students WHERE id = $1`, [studentId]);
    res.status(200).json({
      status: "success",
      message: "Data mahasiswa berhasil dihapus",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
