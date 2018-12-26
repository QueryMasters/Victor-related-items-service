const mysql = require('mysql');
const mysqlConfig = require('./config.js');
const {generateItems, generateReviews, generateFrequentlyTogether, generateRelatedItems, generateFeatureRatings, generateQuestions, generateAnswers} = require('./generateSeedData.js')
const connection = mysql.createConnection(mysqlConfig);
const Sequelize = require('sequelize');

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to database!!!');
    }
});

// without password / with blank password
const sequelize = new Sequelize('fec', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,

});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

let queryInterface = sequelize.getQueryInterface();

// let totalItems = 100;
// let totalReviews = 100;
// let totalQ = 100;


// Functions to get everything from db
// this line isn't working, I want to 
// Item = sequelize.model('item');

const getAllItems = function (callback) {
    // sequelize.query('SELECT * FROM item');
    let queryString = 'SELECT * FROM item';
    connection.query(queryString, function(err, results, fields) {
        if (err) {
            throw err;
        }
        callback(err, results);
    });
};

const getOneItem = function(id, callback) {
    let queryString = `SELECT * FROM item WHERE id = ${id}`;
    connection.query(queryString, function(err, results, fields) {
        if (err) {
            throw err;
        }
        callback(err, results);
    });
}

const getRelated = function(id, callback) {
    let queryString = `SELECT id_item1 FROM relatedItems WHERE id_item2 = ${id}`;
    connection.query(queryString, function(err, results, fields) {
        if (err) {
            throw err;
        }
        callback(err, results);
    });
}

const getFrequent = function(id, callback) {
    let queryString = `SELECT id_item1 FROM frequentlyBoughtTogether WHERE id_item2 = ${id}`;
    connection.query(queryString, function(err, results, fields) {
        if (err) {
            throw err;
        }
        callback(err, results);
    });
}

const postMessage = function(paramsArr) {
    let queryString = `INSERT INTO reviews (body, headline, photoUrl, rating, id_item) VALUES`
    connection.query(queryString, paramsArr, function(err, results, fields){
        if (err) {
            throw err;
        }
    })
}

module.exports = {
    getAllItems,
    getOneItem,
    getRelated,
    getFrequent,
    postMessage
};