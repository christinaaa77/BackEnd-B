const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const errorhandler = require('errorhandler')
const db = require('./db')

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const port = 3000;
const hostname = '127.0.0.1';

app.get('/students', async (req, res) => {
    try {
        const result = await prisma.students.findMany();
        res.status(200).json({
            status: "success",
            data: result,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/students', async (req, res) => {
    const { name, address } = req.body;
    try {
        await prisma.students.create({
            data: {
                name: name,
                address: address,
            },
        });
        res.status(200).json({
            status: 'Success',
            message: 'Data has been inserted successfully',
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/students/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await prisma.students.findUnique({
            where: { id: parseInt(id) }
        });
        if (!result) {
            res.status(404).json({
                status: 'Failed',
                message: 'There is no data for this id'
            });
        } else {
            res.status(200).json({
                status: 'Success',
                message: 'Data has been fetched successfully',
                data: result,
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to fetch data');
    }
});

app.put('/students/:id', async (req, res) => {
    const id = req.params.id;
    const { name, address } = req.body;

    if (!name || !address) {
        return res.status(400).send('Please provide name and address');
    }
    try {
        await prisma.students.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name: name,
                address: address
            },
        });
        res.status(200).json({
            status: 'Success',
            message: 'Data has been updated'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to update student data');
    }
});

app.delete('/students/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await prisma.students.delete({
            where: {
                id: parseInt(id),
            }
        });
        res.status(200).json({
            status: 'Success',
            message: 'Data has been deleted',
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to delete the student data');
    }
});

app.use((req, res, next) =>
    res.status(404).json({
        status: 'Error',
        message: 'Resource not found',
    })
);

app.listen(port, () =>
    console.log(`Server is running at http://${hostname}:${port}`)
);