const faker = require('faker');
const shortid = require('shortid');

const { connection, Product, Frequent, Related } = require('../postgresql/db');

let productCount = 1;
const randomBetweenTwo = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const createProducts = (n) => {
  let products = [];
  for (let i = 1; i <= n; i++) {
    products.push({
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

const insertRelated = async (batchSize) => {
  let related = [];
  
  for (let i = 0; i < batchSize; i++) {

  }

  return related;
};

const insertFrequent = async () => {

};  

connection.authenticate()
  .then(() => {
    console.log('Connected to the database');
    insertProducts(1, 50);
  })
  .catch(err => {
    console.log(err);
  });
  
