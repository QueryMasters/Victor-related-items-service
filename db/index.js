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

let totalItems = 100;
let totalReviews = 100;
let totalQ = 100;

let items = generateItems(totalItems);
// queryInterface.bulkInsert('item', items)
// .then(() => {
//     let frequentItems = generateFrequentlyTogether(totalItems);
//     // async functions for each of these  
//     frequentItems.forEach(tuple => {
//         let id1 = tuple[0];
//         let id2 = tuple[1];
//         connection.query(`INSERT INTO frequentlyBoughtTogether (id_item1, id_item2) VALUES ('${id1}', '${id2}')`, (err) => {
//             if (err) {
//                 console.log(err);
//             }
//         });
//     });

// }).then(() => {
//     let relatedItems = generateRelatedItems(totalItems);
//     console.log(relatedItems);
//     // make async
//     relatedItems.forEach(tuple => {
//         let id1 = tuple[0];
//         let id2 = tuple[1];
//         connection.query(`INSERT INTO relatedItems (id_item1, id_item2) VALUES ('${id1}', '${id2}')`, (err) => {
//             if (err) {
//                 console.log(err);
//             }
//         });
//     });

// });

// It looks like the data is inserting correctly after only running once, but I am getting this error when running this script:
// 
// code: 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD',
// errno: 1366,
// sqlMessage:
//  "Incorrect integer value: 'undefined' for column 'id_item2' at row 1",
// sqlState: 'HY000',
// index: 0,
// sql:
//  "INSERT INTO relatedItems (id_item1, id_item2) VALUES ('6', 'undefined')" }

// queryInterface.bulkInsert('frequentlyBoughtTogether', frequentItems);
// queryInterface.bulkInsert('relateditems', relatedItems);

let questions = generateQuestions(totalQ);
// queryInterface.bulkInsert('questions', questions);

// will generate totalAnswers for totalQ's
let answers = generateAnswers(3 * totalQ, totalQ);
// queryInterface.bulkInsert('answers', answers);

// I don't actually need to generate any reviews, this is mostly used for posting since no review is ever rendered on any module of mine.
// let reviews = generateReviews(totalReviews)
// Similarly for feature ratings, this is mainly for posting
// let featureRatings = generateFeatureRatings();

// Functions to get everything from db

// 
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