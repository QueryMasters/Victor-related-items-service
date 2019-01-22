const faker = require('faker');

const { connection, Product } = require('../mongo/db');

let productCount = 1;
const randomBetweenTwo = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const createProducts = (n) => {
  let products = [];
  for (let i = 1; i <= n; i++) {
    products.push({
      _id: productCount,
      name: faker.commerce.productName() + productCount,
      price: faker.commerce.price(), 
      availableOnPrime: n % 2 === 0,
      numberOfReviews: randomBetweenTwo(1, 20),
      averageStarRating: randomBetweenTwo(1, 5),
      image: faker.image.imageUrl(),
      relatedProducts: [],
      frequentProducts: []
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
      await Product.insertMany(createProducts(batchSize));
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
    console.log(err.errmsg);
  } finally {
    console.log('Inserted 10 million');
    let endTime = Date.now();
    console.log(`Time to complete: ${endTime - startTime}`);
    process.exit();
  }
};

const insertRelatedAndFrequent = async (batchSize, numberOfBatches) => {
  let startTime = Date.now();
  let rand;
  let mainProducts;

  try {
    for (let x = 0; x < numberOfBatches; x++) {
      mainProducts = await Product.find({}).limit(batchSize).skip(x * batchSize);
      for (let i = 1; i <= batchSize; i++) {
        // Random relatedProducts
        rand = randomBetweenTwo(1, 3);
        if (i + (x * batchSize) + rand > batchSize * numberOfBatches) {
          for (let j = rand; j > 0; j--) {
            mainProducts[i - 1].relatedProducts.push(i + (x * batchSize) - j);
          }
        } else {
          for (let j = 1; j <= rand; j++) {
            if (x === 0) {
              mainProducts[i - 1].relatedProducts.push(i + j);
            } else {
              mainProducts[i - 1].relatedProducts.push(i + (x * batchSize) + j);
            }
          }
        }
        // Random frequentProducts
        rand = randomBetweenTwo(1, 3);
        if (i + (x * batchSize) + rand > batchSize * numberOfBatches) {
          for (let j = rand; j > 0; j--) {
            mainProducts[i - 1].frequentProducts.push(i + (x * batchSize) - j);
          }
        } else {
          for (let j = 1; j <= rand; j++) {
            if (x === 0) {
              mainProducts[i - 1].frequentProducts.push(i + j);
            } else {
              mainProducts[i - 1].frequentProducts.push(i + (x * batchSize) + j);
            }
          }
        }
        await mainProducts[i - 1].save();
      }
      if (x === 0)
        console.log(`Total inserted: ${batchSize}`);
      else
        console.log(`Total inserted: ${x * batchSize}`);
    }
  } catch (err) {
    console.log(err);
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
};

const insertRelatedOld = async (batchSize, numberOfBatches) => {
  let startTime = Date.now();
  let rand;
  let randomProducts;
  let mainProducts;

  try {
    for (let x = 0; x < numberOfBatches; x++) {
      mainProducts = await Product.find({}).limit(batchSize).skip(x * batchSize);
      for (let i = 1; i <= batchSize; i++) {
        // randomProducts = await Product.aggregate([{ $sample: { size: 3 }}]);
        rand = randomBetweenTwo(1, 3);
        randomProducts = await Product.find({}).limit(rand).skip(randomBetweenTwo(1, x * batchSize));
        for (let j = rand; j > 0; j--) {
          mainProducts[i].relatedProducts.push(randomProducts[j]._id);
        }
        mainProducts[i].save();
      }
      console.log(x === 0 ? `Total inserted: ${batchSize}` : `Total inserted: ${x * batchSize}`);
    }
  } catch (err) {
    console.log(Object.keys(err));
    console.log(err.name);
    console.log(err.errmsg);
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
      // await Frequent.insertMany(pairs);
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

connection.once('open', () => {
  console.log('Connected to mongo database');
  // insertProducts(100000, 100);
  insertRelatedAndFrequent(100000, 100);
  // insertRelated(100, 50);
  // insertFrequent(200000, 50);
  // insertRelated(200000, 50);
});
