const { ProductSQL } = require('../../db/postgresql/models/product.model');
const { Product } = require('../../db/mongo/models/product.model');

const GetAll = (req, res) => {
  res.send('Getall');
};

const GetById = (req, res) => {
  res.send('GetById');
};

const GetByName = (req, res) => {
  res.send('GetByName');
};

const Create = (req, res) => {
  res.send('Create');
};

const Update = (req, res) => {
  res.send('Update');
};

const Delete = (req, res) => {
  res.send('Delete');
};

module.exports = {
  GetAll,
  GetById,
  GetByName,
  Create,
  Update,
  Delete
};
