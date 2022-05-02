const express = require('express');
const app = express();
const http = require('http');
const fs = require('fs');

const server = http.createServer(app);
let config

app.get('/components', (req, res) => {
  res.send(JSON.stringify(config.components));
});
app.get('/script/:scripName', (req, res) => {
  const scriptName = req.params.scripName
  try {
    if (scriptName && fs.lstatSync('./server/scripts/' + scriptName + '.js').isFile()) {
      console.log(__dirname);
      res.sendFile(__dirname + '/scripts/' + scriptName + '.js');
    } else {
      res.sendStatus(404).send('Not Found');
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500).send('Internal Server Error');
  }
});


loadConfig();

server.listen(1337, '0.0.0.0', () => {
  console.log('Server is up on port 1337');
  console.log(config);
})

function loadConfig() {
  config = JSON.parse(fs.readFileSync('./server/config.json'));
}