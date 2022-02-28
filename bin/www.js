const http = require("http");
const PORT = 8001;
const serverHandle = require("../app.js");

const server = http.createServer(serverHandle);

server.listen(PORT);
console.log("OK");
