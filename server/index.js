const express = require('express');
const bodyParser = require('body-parser');
const {getAllItems, getOneItem, getRelated, getFrequent, postMessage} = require(__dirname + '/../db/index.js')

const app = express();
const PORT = 8888;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));


// GET request for items
app.get('/api/items', (req, res) => {
  // get all items from database
  console.log('I see you from the Item Request!')
  getAllItems((err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
  // I think I want to make the getAllItems function within index.html
});

// GET request for specific item 
app.get('/api/items/:itemId', (req, res) => {
  let id = req.params.itemId;
  getOneItem(id, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  })
});

// GET request for related items
app.get('/api/related/:itemId', (req, res) => {
  let id = req.params.itemId;
  getRelated(id, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  })
});

// GET request for frequentlyTogetherItems
app.get('/api/frequent/:itemId', (req, res) => {
  let id = req.params.itemId;
  getFrequent(id, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

// POST request for messages
app.post('/api/messages', (req, res) => {
  let params = req.body;
  postMessage(params);
});


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
  