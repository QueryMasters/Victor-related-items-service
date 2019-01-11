const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const PORT = 1337;

const ProductRoutes = require('./routes/product.routes.pg');
const FrequentRoutes = require('./routes/frequent.routes.pg');
const RelatedRoutes = require('./routes/related.routes.pg');

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(cors());

// STATIC FILES
app.use(express.static(__dirname + '/../public'));

// ROUTES
app.use('/pg/products', ProductRoutes);
app.use('/pg/related', RelatedRoutes);
app.use('/pg/frequent', FrequentRoutes);

// app.use('/m/products', ProductRoutes);
// app.use('/m/related', RelatedRoutes);
// app.use('/m/frequent', FrequentRoutes);

// app.get('/api/items', (req, res) => {
//   getAllItems((err, data) => {
//     res.send(data);
//   });
// });

// // GET request for specific item 
// app.get('/api/items/:itemId', (req, res) => {
//   let id = req.params.itemId;
//   getOneItem(id, (err, data) => {
//     res.send(data);
//   })
// });

// // GET request for related items
// app.get('/api/related/:itemId', (req, res) => {
//   let id = req.params.itemId;
//   getRelated(id, (err, data) => {
//     res.send(data);
//   })
// });

// // GET request for frequentlyTogetherItems
// app.get('/api/frequent/:itemId', (req, res) => {
//   let id = req.params.itemId;
//   getFrequent(id, (err, data) => {
//     res.send(data);
//   });
// });

// // POST request for messages
// app.post('/api/messages', (req, res) => {
//   let params = req.body;
//   postMessage(params);
// });

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
