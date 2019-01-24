const {promisify} = require('util');
const redis = require("redis");
const config = require('./config');
const client = redis.createClient(config);
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
client.on('connect', () => {
  console.log('connected to redis');
});

client.on('error', (error) => {
  console.log(error);
});
module.exports = {
  client,
  getAsync,
  setAsync
};