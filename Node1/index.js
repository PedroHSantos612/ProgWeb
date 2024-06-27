//parte 1
const http = require('http');
const fs = require('fs'); 
const path = require('path'); 

const server = http.createServer(function(req,res){
res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
fs.readdir(__dirname, (err, files) => { 
  if (err) 
    console.log(err); 
  else { 
    files.forEach(file => { 
      res.write(file + '<br>');
    }) 
  } 
  res.end();
}) 

});
server.listen(3333);
