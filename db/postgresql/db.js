const Sequelize = require('sequelize');
const { database, user, password, port, host} = require('./config');

const ProductModel = require('./models/product.model');
const FrequentModel = require('./models/frequent.model');
const RelatedModel = require('./models/frequent.model');

const connection = new Sequelize(database, user, password, {
  host,
  dialect: 'postgres',
  operatorsAliases: false,
});

connection.authenticate()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(err => {
    console.log(err);
  });

const Product = ProductModel(connection, Sequelize);
const Frequent = FrequentModel(connection, Sequelize);
const Related = RelatedModel(connection, Sequelize);

connection.sync({ force: true })
  .then(() => {
    console.log('SYNC complete');
  });

module.exports = {
  connection,
  Product,
  Frequent,
  Related
};
