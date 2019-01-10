const mongoose = require('mongoose');
const { user, password, database, host, port } = require('./config');

const ProductSchema = require('./models/product.model');
const FrequentSchema = require('./models/frequent.model');
const RelatedSchema = require('./models/related.model');
 
mongoose.connect(`mongodb://${host}:${port}/${database}`);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
  console.log('Connected to mongo database');
});

const Product = mongoose.model('product', ProductSchema);
const Frequent = mongoose.model('frequent', FrequentSchema);
const Related = mongoose.model('related', RelatedSchema);

module.exports = {
  connection: mongoose.connection,
  Product,
  Frequent,
  Related
};