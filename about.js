const members = require('./members'); //import members module
const moment = require('moment');

//format “2023-02-09T07:51:09+08:00”
const formattedDate = moment().format('MMMM Do YYYY, h:mm:ss a');


//export module
module.exports = {
    "Status": 'success',
    "Message": 'response success',
    "Description": 'Exercise #03',
    "Date": `${formattedDate}`,
    "Data": [
        members.hendy(), 
        members.gerry(), 
        members.mitch(),
        members.ichad(),
        members.christina()
    ] 
}