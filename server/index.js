require('newrelic');
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(cors());

// ROUTES
app.use('/health', (req, res) => {
  res.status(200).send();
});
app.use('/products', ProductRoutes);
app.use('/related', RelatedRoutes);
app.use('/frequent', FrequentRoutes);

// STATIC FILES
app.use(express.static(__dirname + '/../public'));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
