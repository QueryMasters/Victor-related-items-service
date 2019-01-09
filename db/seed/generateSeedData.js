const faker = require('faker');

const { connection, Product, Frequent, Related } = require('../postgresql/db');
const { productImageURLs } = require('../productImages.js');

// Random Generation
// Generate Item (num is total number of items), number of reviews is seeded as random for now
const generateItems = (num) => {
  const items = [];

  for (let i = 1; i <= num; i++) {
    let itemObject = {
      name: faker.commerce.productName(),
      numberOfReviews: Math.floor(Math.random() * 10000 + 1),
      price: faker.commerce.price(),
      averageStarRating: Math.floor(Math.random() * (5)) + 1,
      availableOnPrime: (Math.random() < 0.8),
      image: faker.image.imageUrl(),
    };

    items.push(itemObject);
  }

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
        tempRandArr.push(rangeOfItems[randomItemIdIndex]);
        rangeOfItems.splice(randomItemIdIndex, 1);
      }
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
        tempRandArr.push(rangeOfItems[randomItemIdIndex]);
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
        // returnArr.push([rangeOfItems[i]]);
        rangeOfItems.splice(i, 1);
      }
    }
  }
  return returnArr;
};

// Declare variables for generation

// const queryInterface = connection.getQueryInterface();
const totalItems = 10000;

// Call random generation functions to seed database
// Generate Items, then creates random associations between items for frequentlyTogether and relatedItems tables

const items = generateItems(totalItems);
const frequentItems = generateFrequentlyTogether(totalItems);
const relatedItems = generateRelatedItems(totalItems);

console.log('ITEMS -------------------', items);
process.exit();

queryInterface.bulkInsert('products', items)
  .then(() => {
    let frequentItems = generateFrequentlyTogether(totalItems);
    let queryString = 'INSERT INTO frequentlyBoughtTogether (id_item1, id_item2) VALUES ';
    frequentItems.forEach((tuple) => {
      let id1 = tuple[0];
      let id2 = tuple[1];
      queryString += `(${id1}, ${id2}), `;
    });
    queryString = queryString.slice(0, -2);
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
      queryString += `(${id1}, ${id2}), `;
    });
    queryString = queryString.slice(0, -2);
    return new Promise((resolve, reject) => {
      connection.query(queryString, (err) => {
        if (err) {
          console.log(err);
        }
        resolve();
      });
    });
  }).then(() => {
    connection.close();
    process.exit();
  });

module.exports = {
  generateItems,
  generateFrequentlyTogether,
  generateRelatedItems,
};
