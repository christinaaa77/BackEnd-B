const http = require('http')
const about = require('./about') //import about module
const users = require('./users') //import users module

const server = http.createServer( (req, res) => {
    res.statusCode = 200;
    
    //Url link
    const url = req.url;

    //(localhost:port/)
    if(url === "/"){
        res.setHeader('Content-Type', 'text/plain');
        res.write('This is the home page');
    }
    //(localhost:port/about)
    else if(url === "/about"){
        res.setHeader('Content-Type', 'text/json');
        res.write(JSON.stringify(about, null, 2)) //Json from about module
    }
    //(localhost:port/users)
    else if(url === "/users"){
        res.setHeader('Content-Type', 'text/json');
        res.write(JSON.stringify(users, null, 2)) //Json from users module
    }
    
    res.end();
})

//Alternative for ".listen(2000)"
const hostname = '127.0.0.1'; //localhost
const port = 2000;

server.listen(port, hostname, ()=>{
    //localhost:2000
    console.log(`Server running at http://${hostname}:${port}/`)
})