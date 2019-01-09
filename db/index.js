const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to database!!!');
  }
});

const getAllItems = function (callback) {
  let queryString = 'SELECT * FROM item';
  connection.query(queryString, function(err, results, fields) {
    if (err) {
      throw err;
    }
    callback(err, results);
  });
};

const getOneItem = function (id, callback) {
  let queryString = `SELECT * FROM item WHERE id = ${id}`;
  connection.query(queryString, function(err, results, fields) {
    if (err) {
      throw err;
    }
    callback(err, results);
  });
};

const getRelated = function (id, callback) {
  let queryString = `SELECT id_item1 FROM relatedItems WHERE id_item2 = ${id}`;
  connection.query(queryString, function(err, results, fields) {
    if (err) {
      throw err;
    }
    callback(err, results);
  });
};

const getFrequent = function (id, callback) {
  console.log('the id is',id);
  let queryString = `SELECT id_item1 FROM frequentlyBoughtTogether WHERE id_item2 = ${id}`;
  connection.query(queryString, function(err, results, fields) {
    if (err) {
      throw err;
    }
    callback(err, results);
  });
};

module.exports = {
    getAllItems,
    getOneItem,
    getRelated,
    getFrequent,
};