const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const PORT = process.env.PORT || 5001;
const app = express();
const { startDatabase } = require("./api/config")
const ProductRoute = require('./routes/products.route')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));
app.use('/api', ProductRoute)

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/public/index.html'))
})

startDatabase().then(async () => {
  app.listen(PORT, async () => {
    console.log({ success: true })
  })
})