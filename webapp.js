let http = require("http")
let fs = require("fs");
let qs = require("querystring");
let mysql = require("mysql");
require("dotenv").config();

http.createServer(onRequest).listen(8888);
console.log("Server has started");

function onRequest(request, response) {

  if (request.method === "GET") {

    response.writeHead(200, {
      "Content-Type": "text/html"
    });

    fs.readFile("./index.html", null, function(error, data) {

      if (error) {
        response.writeHead(404);
        respone.write("Whoops! File not found!");

      } else {
        response.write(data);
      }
      response.end();
    });

  } else if (request.method === "POST") {
    let body = "";

    request.on("data", function(data) {
      body += data;
    });

    request.on("end", function() {
      let post = qs.parse(body);

      let connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: process.env.PASSWORD,
        database: "test_data"
      });

      let sql = "SELECT * FROM login_info WHERE username = '" +
        post["username"] + "' AND " + "password = '" + post["password"] + "'";

      connection.query(sql, (error, results, fields) => {

        if (error) {
          return console.error(error.message);
        }

        if(results.length != 0) {
          response.writeHead(200);
          response.write("Success");
        } else {
          response.write("Invalid login");
        }
        response.end();
      });

      connection.end(function(err) {

        if (err) {
          return console.error("error: " + err.message);
        }
        console.log("Closing the database connection.");
      });
    });

  }
}
