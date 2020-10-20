const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const PORT = process.env.PORT || 5001;
const app = express();

// environmental variables
require('dotenv').config()



app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'));
app.listen(PORT);

app.get('/admin', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/public/index.html'))
})
