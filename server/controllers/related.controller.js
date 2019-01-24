const { connection } = require('../../db/postgresql/db2');
const {promisify} = require('util');

const { getAsync, setAsync } = require('../../db/redis/redis');

const GetAll_PG = (req, res) => {

};

const GetById_PG = async (req, res) => {
  const { id } = req.params;

  let redisResult = await getAsync('related_' + id);
  if (redisResult) {
    return res.status(200).send(JSON.parse(redisResult));
  }

  try {
    let result = await connection.query('SELECT * FROM products WHERE id IN (SELECT r.id_product_2 FROM products p INNER JOIN relateds r ON p.id=r.id_product_1 WHERE p.id=$1)', [id]);
    setAsync('related_' + id, JSON.stringify(result.rows), 'EX', 60);
  
    if (result.rowCount > 0) {
      return res.status(200).send(result.rows);
    } else {
      return res.status(404).send();
    }
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const Create_PG = (req, res) => {

};

const Update_PG = (req, res) => {

};

const Delete_PG = (req, res) => {

};
const GetAll_M = (req, res) => {

};

const GetById_M = (req, res) => {

};

const Create_M = (req, res) => {

};

const Update_M = (req, res) => {

};

const Delete_M = (req, res) => {

};

module.exports = {
  GetAll_PG,
  GetById_PG,
  Create_PG,
  Update_PG,
  Delete_PG,
  GetAll_M,
  GetById_M,
  Create_M,
  Update_M,
  Delete_M,
};
