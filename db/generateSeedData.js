const faker = require('faker');
const mysql = require('mysql');
const Sequelize = require('sequelize');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);
const { productImageURLs } = require('./productImages.js');

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
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Random Generation
// Generate Item (num is total number of items), number of reviews is seeded as random for now
const generateItems = (num) => {
  let items = [];
  for (let i = 1; i <= num; i++) {
    let itemObject = {
      itemName: faker.commerce.productName(),
      numberOfReviews: Math.floor(Math.random() * 10000 + 1),
      price: faker.commerce.price(),
      averageStarRating: Math.floor(Math.random() * (5)) + 1,
      availableOnPrime: (Math.random() < 0.8),
      image: productImageURLs[Math.floor(Math.random() * (productImageURLs.length))][0],
    };

    items.push(itemObject);
  }
  // console.log(items);
  return items;

};

// Generate Singles, Pairs or Trios of frequently together items by id 1 - 100
const generateFrequentlyTogether = (num) => {
  let rangeOfItems = [...Array(num + 1).keys()];
  rangeOfItems.shift();
  let returnArr = [];
  while (rangeOfItems.length > 0) {
    if (rangeOfItems.length > 3) {
      let randThroughThree = Math.floor(Math.random() * (3)) + 1;
      let tempRandArr = [];
      for (let i = 0; i < randThroughThree; i++) {
        let randomItemIdIndex = Math.floor(Math.random() * (rangeOfItems.length - 0)) + 0;
        if (randThroughThree !== 1) {
          tempRandArr.push(rangeOfItems[randomItemIdIndex]);
        }
        rangeOfItems.splice(randomItemIdIndex, 1);
      }
      let generatePairs = (arr) => {
        let pairsArr = [];
        if (arr.length === 1) {
          pairsArr.push([arr[0]]);
        }
        for (let i = 0; i < arr.length; i++) {
          for(let j = 0; j < arr.length; j++) {
            if (i !== j) {
              pairsArr.push([arr[i], arr[j]]);
            }
          }
        }
        return pairsArr;
      };
      returnArr = returnArr.concat(generatePairs(tempRandArr));

    } else {
      for (let i = 0; i < rangeOfItems.length; i++) {
        rangeOfItems.splice(i, 1);
      }
    }
  }
  return returnArr;
};

// Generate lists of related items for num items
const generateRelatedItems = (num) => {
  let rangeOfItems = [...Array(num + 1).keys()];
  rangeOfItems.shift();
  let returnArr = [];
  while (rangeOfItems.length > 0) {
    if (rangeOfItems.length > 20) {
      let randThroughThree = Math.floor(Math.random() * (20 - 5 + 1)) + 5;
      let tempRandArr = [];

      for (let i = 0; i < randThroughThree; i++) {
        let randomItemIdIndex = Math.floor(Math.random() * (rangeOfItems.length - 0)) + 0;
        // console.log('the random item id index is ', randomItemIdIndex);
        tempRandArr.push(rangeOfItems[randomItemIdIndex]);
        rangeOfItems.splice(randomItemIdIndex, 1);
      }
      // console.log('the temp array is: ', tempRandArr);
      let generatePairs = (arr) => {
        let pairsArr = [];
        if (arr.length === 1) {
          pairsArr.push([arr[0]]);
        }
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < arr.length; j++) {
            if (i !== j) {
              pairsArr.push([arr[i], arr[j]]);
            }
          }
        }
        return pairsArr;
      };
      returnArr = returnArr.concat(generatePairs(tempRandArr));

    } else if (rangeOfItems.length > 5) {
      let randThroughThree = Math.floor(Math.random() * (5)) + 2;
      let tempRandArr = [];

      for (let i = 0; i < randThroughThree; i++) {
        let randomItemIdIndex = Math.floor(Math.random() * (rangeOfItems.length - 0)) + 0;
        // console.log('the random item id is ', randomItemIdIndex);
        tempRandArr.push(rangeOfItems[randomItemIdIndex]);
        rangeOfItems.splice(randomItemIdIndex, 1);
      }
      // console.log('the temp array is: ', tempRandArr);

      let generatePairs = (arr) => {
        let pairsArr = [];
        if (arr.length === 1) {
          pairsArr.push([arr[0]]);
        }
        for (let i = 0; i < arr.length; i++) {
          for(let j = 0; j < arr.length; j++) {
            if (i !== j) {
              pairsArr.push([arr[i], arr[j]]);
            }
          }
        }
        return pairsArr;
      };
      returnArr = returnArr.concat(generatePairs(tempRandArr));
    } else {
      for (let i = 0; i < rangeOfItems.length; i++) {
        // returnArr.push([rangeOfItems[i]]);
        rangeOfItems.splice(i, 1);
      }
    }
  }
  return returnArr;
};

// Declare variables for generation

const queryInterface = sequelize.getQueryInterface();
const totalItems = 100;

// Call random generation functions to seed database
// Generate Items, then creates random associations between items for frequentlyTogether and relatedItems tables

// const Items = sequelize.define('item',
//   {
//     id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
//     itemName: Sequelize.STRING,
//     price: Sequelize.INTEGER,
//     numberOfReviews: Sequelize.INTEGER,
//     averageStarRating: Sequelize.INTEGER,
//     availableOnPrime: Sequelize.BOOLEAN,
//     image: Sequelize.STRING,
//   },
//   {
//     timestamps: false,
//   });

// const FrequentItems = sequelize.define('frequentlyBoughtTogether',
//   {
//     id_item1: {
//       type: Sequelize.INTEGER,
//       references: {
//         model: Items,
//         key: 'id',
//       },
//     },
//     id_item2: {
//       type: Sequelize.INTEGER,
//       references: {
//         model: Items,
//         key: 'id',
//       },
//     },
//   },
//   {
//     timestamps: false,
//   });

// const RelatedItems = sequelize.define('relatedItems',
//   {
//     id_item1: {
//       type: Sequelize.INTEGER,
//       references: {
//         model: Items,
//         key: 'id',
//       },
//     },
//     id_item2: {
//       type: Sequelize.INTEGER,
//       references: {
//         model: Items,
//         key: 'id',
//       },
//     },
//   },
//   {
//     timestamps: false,
//   });


// const addFrequentItem = (id_item1, id_item2, callback) => {
//   return FrequentItems.sync()
//     .then(() => FrequentItems.create({
//       id_item1,
//       id_item2,
//     }))
//     .then(() => {
//       callback();
//     })
//     .catch((err) => {
//       throw err;
//     });
// };

// const addRelatedItem = (id_item1, id_item2, callback) => {
//   return RelatedItems.sync()
//     .then(() => RelatedItems.create({
//       id_item1,
//       id_item2,
//     }))
//     .then(() => {
//       callback();
//     })
//     .catch((err) => {
//       throw err;
//     });
// };

const items = generateItems(totalItems);
const frequentItems = generateFrequentlyTogether(totalItems);
const relatedItems = generateRelatedItems(totalItems);
// console.log('related items are: ', JSON.stringify(relatedItems));

// queryInterface.bulkInsert('item', items)
//   .then(() => {
//     frequentItems.forEach((tuple) => {
//       let id1 = tuple[0];
//       let id2 = tuple[1];
//       addFrequentItem(id1, id2, () => {});
//     });
//   }).then(() => {
//     relatedItems.forEach((tuple) => {
//       let id1 = tuple[0];
//       let id2 = tuple[1];
//       addRelatedItem(id1, id2, () => {});
//     });
//   }).then(() => {
//   // sequelize.connectionManager.close().then(() => console.log('shut down gracefully'));
//   });

queryInterface.bulkInsert('item', items)
  .then(() => {
    let frequentItems = generateFrequentlyTogether(totalItems);
    let queryString = 'INSERT INTO frequentlyBoughtTogether (id_item1, id_item2) VALUES ';
    frequentItems.forEach((tuple) => {
      let id1 = tuple[0];
      let id2 = tuple[1];
      queryString += `(${id1}, ${id2}), `;
      // connection.query(`INSERT INTO frequentlyBoughtTogether (id_item1, id_item2) VALUES ('${id1}', '${id2}')`, (err) => {
      //   if (err) {
      //     console.log(err);
      //   }
    });
    queryString = queryString.slice(0, -2);
    // console.log('the frequent items string is: ', queryString);
    return new Promise((resolve, reject) => {
      connection.query(queryString, (err) => {
        if (err) {
          console.log(err);
        }
        resolve();
      });
    });
  }).then(() => {
    let relatedItems = generateRelatedItems(totalItems);
    let queryString = 'INSERT INTO relatedItems (id_item1, id_item2) VALUES ';
    relatedItems.forEach((tuple) => {
      let id1 = tuple[0];
      let id2 = tuple[1];
      // console.log('the tuple is: ', [id1, id2]);
      queryString += `(${id1}, ${id2}), `;
    });
    queryString = queryString.slice(0, -2);
    // console.log('the related items string is: ', queryString);
    return new Promise((resolve, reject) => {
      connection.query(queryString, (err) => {
        if (err) {
          console.log(err);
        }
        resolve();
      });
    });
  }).then(() => {
    sequelize.close();
    process.exit();
  });

module.exports = {
  generateItems,
  generateFrequentlyTogether,
  generateRelatedItems,
};
