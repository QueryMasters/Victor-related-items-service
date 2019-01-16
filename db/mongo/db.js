const mongoose = require('mongoose');
const { user, password, database, host, port } = require('./config');

const ProductSchema = require('./models/product.model');
 
mongoose.connect(`mongodb://${host}:${port}/${database}`);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
  console.log('Connected to mongo database');
});

const Product = mongoose.model('product', ProductSchema);

module.exports = {
  connection: mongoose.connection,
  Product
};