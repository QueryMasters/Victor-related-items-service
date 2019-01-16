const prettyHrtime = require('pretty-hrtime');
const { database, user, password, port, host} = require('./config');
const { Client } = require('pg')

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const runBechmark = async (index, n) => {
  console.log('Running benchmark');
  const client = new Client({
    user,
    host,
    database,
    password,
    port,
  });
  
  await client.connect();
  console.log('Connected to PostgreSQL');
  let results = [];
  let queryTime;
  let start;
  let end;
  let startIndex = index;
  let randomNumber;
  
  for (let i = 0; i <= n; i++) {
    randomNumber = getRandomInt(startIndex, 10000000);
    start = process.hrtime();
    // await client.query('SELECT * FROM products WHERE id = $1', [randomNumber]);
    await client.query('SELECT * FROM products WHERE id IN (SELECT r.id_product_2 FROM products p INNER JOIN relateds r ON p.id=r.id_product_1 WHERE p.id=$1)', [randomNumber]);
    // await client.query('SELECT * FROM products WHERE id IN (SELECT f.id_product_2 FROM products p INNER JOIN frequents f ON p.id=f.id_product_1 WHERE p.id=$1)', [randomNumber]);
    end = process.hrtime(start);
    queryTime = prettyHrtime(end, { precise: true });
    console.log(queryTime);
    console.log(randomNumber);
    results.push(queryTime);
  }
  
  results = results.map(item => item.split(' '));

  results = results.map(element => {
    if (element[1] === 'ms') {
      return Number(element[0]);
    } else if (element[1] === 's') {
      return Number(element[0]) / 1000;
    } else if (element[1] === 'μs') {
      return Number(element[0]) / 1000;
    }
  });

  console.log('Average Query Time: ', results.reduce((acc, curr) => acc + curr)/ results.length);
  
  await client.end()
};

try {
  runBechmark(9000000, 10000);
} catch (err) {
  console.log(err);
}
