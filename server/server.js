const express = require('express');
const app = express();
const http = require('http');
const fs = require('fs');

const server = http.createServer(app);
let config

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.get('/components', (req, res) => {
  res.send(JSON.stringify(config.components));
});
app.get('/script/:scripName', (req, res) => {
  const scriptName = req.params.scripName
  try {
    if (scriptName && fs.lstatSync('./server/scripts/' + scriptName + '.js').isFile()) {
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