const faker = require('faker');

const { connection, Product, Frequent, Related } = require('../postgresql/db');

let productCount = 1;
const randomBetweenTwo = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const createProducts = (n) => {
  let products = [];
  for (let i = 1; i <= n; i++) {
    products.push({
      id: productCount,
      name: faker.commerce.productName() + productCount,
      price: faker.commerce.price(), 
      availableOnPrime: n % 2 === 0,
      numberOfReviews: randomBetweenTwo(1, 20),
      averageStarRating: randomBetweenTwo(1, 5),
      image: faker.image.imageUrl()
    });
    productCount++;
  }

  return products;
};

const insertProducts = async (batchSize, numberOfBatches) => {
  let startTime = Date.now();
  try {
    console.log('Seeding started');
    for (let i = 1; i <= numberOfBatches; i++) {
      await Product.bulkCreate(createProducts(batchSize));
      console.log(`Insert ${batchSize} products.`);
      if (i === 0)
        console.log(`Total inserted: ${batchSize}`);
      else
        console.log(`Total inserted: ${i * batchSize}`);
    }
  } catch (err) {
    console.log(err);
    console.log(Object.keys(err));
    console.log(err.original.toString().slice(0, 1000))
    console.log(err.errors);
  } finally {
    console.log('Inserted 10 million');
    let endTime = Date.now();
    console.log(`Time to complete: ${endTime - startTime}`);
    process.exit();
  }
};

const insertRelated = async (batchSize, numberOfBatches) => {
  let startTime = Date.now();
  let rand = 0;
  let pairs = [];

  try {
    for (let x = 0; x < numberOfBatches; x++) {
      for (let i = 1; i <= batchSize; i++) {
        rand = randomBetweenTwo(1, 3);
        if (i + (x * batchSize) + rand > batchSize * numberOfBatches) {
          for (let j = rand; j > 0; j--) {
            pairs.push({
              id_product_1: i + (x * batchSize),
              id_product_2: i + (x * batchSize) - j
            });
          }
        } else {
          for (let j = 1; j <= rand; j++) {
            if (x === 0) {
              pairs.push({
                id_product_1: i,
                id_product_2: i + j
              });
            } else {
              pairs.push({
                id_product_1: i + (x * batchSize),
                id_product_2: i + (x * batchSize) + j
              });
            }
          }
        }
      }
      // console.log('Pairs: ', pairs);
      await Related.bulkCreate(pairs);
      pairs = [];
      if (x === 0)
        console.log(`Total inserted: ${batchSize}`);
      else
        console.log(`Total inserted: ${x * batchSize}`);
    }
  } catch (err) {
    console.log(err.name);
    console.log(Object.keys(err));
    console.log(err.original.toString().slice(0, 2000))
    console.log(err.errors);
  } finally {
    console.log(`Done inserting ${batchSize * numberOfBatches} Related products`);
    let endTime = Date.now();
    console.log(`Time to complete: ${endTime - startTime}`);
    process.exit();
  }

  return related;
};

const insertFrequent = async (batchSize, numberOfBatches) => {
  let startTime = Date.now();
  let rand = 0;
  let pairs = [];

  try {
    for (let x = 0; x < numberOfBatches; x++) {
      for (let i = 1; i <= batchSize; i++) {
        rand = randomBetweenTwo(1, 3);
        if (i + (x * batchSize) + rand > batchSize * numberOfBatches) {
          for (let j = rand; j > 0; j--) {
            pairs.push({
              id_product_1: i + (x * batchSize),
              id_product_2: i + (x * batchSize) - j
            });
          }
        } else {
          for (let j = 1; j <= rand; j++) {
            if (x === 0) {
              pairs.push({
                id_product_1: i,
                id_product_2: i + j
              });
            } else {
              pairs.push({
                id_product_1: i + (x * batchSize),
                id_product_2: i + (x * batchSize) + j
              });
            }
          }
        }
      }
      await Frequent.bulkCreate(pairs);
      pairs = [];
      if (x === 0)
        console.log(`Total inserted: ${batchSize}`);
      else
        console.log(`Total inserted: ${x * batchSize}`);
    }
  } catch (err) {
    console.log(err.name);
    console.log(Object.keys(err));
    console.log(err.original.toString().slice(0, 2000))
    console.log(err.errors);
  } finally {
    console.log(`Done inserting ${batchSize * numberOfBatches} Frequent products`);
    let endTime = Date.now();
    console.log(`Time to complete: ${endTime - startTime}`);
    process.exit();
  }

  return related;
};  

connection.authenticate()
  .then(() => {
    console.log('Connected to the database');
    // insertProducts(10, 10);
    // insertFrequent(10, 10);
    // insertRelated(10, 10);
    // return connection.sync({ force: true });
    return connection.sync();
  })
  .then(() => {
    console.log('Database Synced');
    // insertProducts(10, 10);
    // insertFrequent(10, 10);
    // insertRelated(10, 10);
  })
  .catch(err => {
    console.log(err);
  });