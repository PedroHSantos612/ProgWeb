//parte 1
const { readdir } = require('fs');
const http = require('http');
const path = process.argv[2];
const server = http.createServer(function(req,res){
  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  readdir(path, (err, files) => {
    if (err) {
      res.write('Não foi possível escanear o diretório: ' + err);
      res.end();
      return console.error('Não foi possível escanear o diretório: ' + err);
    }
    files.forEach(file => {
      res.write(file + '<br>');
      console.log(file); 
    });
    res.end(); 
  });
});
server.listen(3333);
