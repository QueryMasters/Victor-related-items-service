const { database, user, password, port, host} = require('./config');
const { Client, Pool } = require('pg')

const connection = new Client({
  user,
  host,
  database,
  password,
  port,
});

// const connection = new Pool({
//   user,
//   host,
//   database,
//   password,
//   port,
//   max: 100,
// });

connection.connect();

module.exports = {
  connection,
};
