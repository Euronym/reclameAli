const http = require("http");

const app = require("./app");

const port = process.env.PORT || 3000;

const server = http.createServer();

server.listen(port, () =>{
    console.log("connection started at port 3000.");
});
