// about
const express = require('express');
const aboutRouter = express.Router();
const membersRouter = require('./members'); // Import members router

const moment = require('moment');

const formattedDate = moment().format('MMMM Do YYYY, h:mm:ss a');

// define the about page route
aboutRouter.get('/', async (req, res) => {
    try {
        // Create an array to store the results from members.js router
        const membersData = [];

        // Call each membersRouter route and gather their responses
        membersData.push(await membersRouter.getHendy());
        membersData.push(await membersRouter.getGerry());
        membersData.push(await membersRouter.getMitch());
        membersData.push(await membersRouter.getIchad());
        membersData.push(await membersRouter.getChristina());

        const about = {
            "Status": 'success',
            "Message": 'response success',
            "Description": 'Exercise #03',
            "Date": `${formattedDate}`,
            "Data": membersData
        };
        res.json(about);
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            Status: 'error',
            Message: 'Internal Server Error',
        });
    }
});

module.exports = aboutRouter;