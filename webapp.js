let http = require("http")
let fs = require('fs');

http.createServer(onRequest).listen(8888);
console.log("Server has started");

function onRequest(request, response) {

  if (request.method === "GET") {
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    fs.readFile('./index.html', null, function(error, data) {
      if (error) {
        response.writeHead(404);
        respone.write('Whoops! File not found!');
      } else {
        response.write(data);
      }
      response.end();
    });
  } else if (request.method === "POST") {
    console.log("POST request");
    response.end();
  }
}
