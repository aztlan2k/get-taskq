#!/usr/bin/env node

var http = require("http");
var fs = require('fs');

var data;
try {
  data = fs.readFileSync('task-manager.json', 'utf8');
} catch(e) {
  console.log('Error:', e.stack);
}

function shuffle (array) {
  var i = 0
    , j = 0
    , temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}


// generate a random number between start <= x <= end
function randomInt (start, end) {
  return Math.floor(Math.random() * (end - start + 1) + start);
}


http.createServer(function (request, response) {

  // randomly throw in some 500's 10% of the time...
  if (randomInt(1, 100) <= 10) {
    response.writeHead(500);
    response.end();
  } else {
    // Send the HTTP header
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    //response.writeHead(200, {'Content-Type': 'text/plain'});
    response.writeHead(200, {'Content-Type': 'application/json'});

    // Send the response body as "Hello World"
    //response.end('Hello World\n');

    // shuffle entries
    var taskq = JSON.parse(data);
    shuffle(taskq.tasks);
    response.end(JSON.stringify(taskq));
  }
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
