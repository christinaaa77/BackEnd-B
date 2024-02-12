const express = require('express');
const membersRouter = express.Router();

// Simulate asynchronous data retrieval with Promises
const fetchData = (delay, data) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(data);
        }, delay);
    });
};

// Export modules
membersRouter.getHendy = async () => {
    const data = {
        "id": 1,
        "nim": '105022110006',
        "nama": 'Batuwael, Hendy Riawan',
        "nomor_telp": '0813-4188-0098'
    };

    // Simulating asynchronous data retrieval
    return fetchData(100, data);
};

membersRouter.getGerry = async () => {
    const data = {
        "id": 2,
        "nim": '105022110065',
        "nama": 'Runtu, Gerry Jonathan',
        "nomor_telp": '0812-4411-3106'
    };

    // Simulating asynchronous data retrieval
    return fetchData(100, data);
};

membersRouter.getMitch = async () => {
    const data = {
        "id": 3,
        "nim": '105022110002',
        "nama": 'Mumbunan, Syaloom Del Mitch',
        "nomor_telp": '0821-8932-1340'
    };

    // Simulating asynchronous data retrieval
    return fetchData(100, data);
};

membersRouter.getIchad = async () => {
    const data = {
        "id": 4,
        "nim": '105022010101',
        "nama": 'Lahea, Richard Theofany Fritzgerald',
        "nomor_telp": '0896-9562-7930'
    };

    // Simulating asynchronous data retrieval
    return fetchData(100, data);
};

membersRouter.getChristina = async () => {
    const data = {
        "id": 5,
        "nim": '105022010081',
        "nama": 'Golung, Christina Grace',
        "nomor_telp": '0895-8014-78980'
    };

    // Simulating asynchronous data retrieval
    return fetchData(100, data);
};

module.exports = membersRouter;
