const prettyHrtime = require('pretty-hrtime');
const { connection, Product } = require('../mongo/db');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const runBechmark = async (index, n) => {
  console.log('Running benchmark');
  let results = [];
  let queryTime;
  let start;
  let end;
  let startIndex = index;
  let randomNumber;

  for (let i = 0; i <= n; i++) {
    randomNumber = getRandomInt(startIndex, 10000000);
    start = process.hrtime();
    // Just product
    // let result = await Product.findById(randomNumber).exec();
    // let result = await Product.findById(randomNumber).populate('relatedProducts').exec();
    // let result = await Product.findById(randomNumber).populate('frequentProducts').exec();
    let result = await Product.findById(randomNumber)
      .populate('frequentProducts')
      .populate('relatedProducts')
      .exec();
    // related
    // for (let i = 0; i < result.relatedProducts.length; i++) {
    //   await Product.find({ _id: result.relatedProducts[i] }).exec();
    // }
    // frequent
    // for (let i = 0; i < result.frequentProducts.length; i++) {
    //   await Product.find({ _id: result.frequentProducts[i] }).exec();
    // }
    end = process.hrtime(start);
    queryTime = prettyHrtime(end);
    console.log(result);
    console.log(queryTime);
    console.log(randomNumber);
    results.push(queryTime);
  }
  
  results = results.map(item => item.split(' '));

  results = results.map(element => {
    if (element[1] === 'ms') {
      return Number(element[0]);
    } else if (element[1] === 's') {
      return Number(element[0]) * 1000;
    } else if (element[1] === 'μs') {
      return Number(element[0]) / 1000;
    }
  });

  console.log('Average Query Time: ', results.reduce((acc, curr) => acc + curr) / results.length);
};

try {
  runBechmark(9000000, 10000);
  console.log('after benchmark');
} catch (err) {
  console.log('error');
  console.log(err);
} finally {
  // process.exit();
}
