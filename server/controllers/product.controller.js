const { ProductSQL } = require('../../db/postgresql/models/product.model');
const { Product } = require('../../db/mongo/models/product.model');

const GetAll_PG = (req, res) => {
  res.send('Getall');
};

const GetById_PG = (req, res) => {
  res.send('GetById');
};

const GetByName_PG = (req, res) => {
  res.send('GetByName');
};

const Create_PG = (req, res) => {
  res.send('Create');
};

const Update_PG = (req, res) => {
  res.send('Update');
};

const Delete_PG = (req, res) => {
  res.send('Delete');
};

const GetAll_M = (req, res) => {
  res.send('Getall');
};

const GetById_M = (req, res) => {
  res.send('GetById');
};

const GetByName_M = (req, res) => {
  res.send('GetByName');
};

const Create_M = (req, res) => {
  res.send('Create');
};

const Update_M = (req, res) => {
  res.send('Update');
};

const Delete_M = (req, res) => {
  res.send('Delete');
};

module.exports = {
  GetAll_PG,
  GetById_PG,
  GetByName_PG,
  Create_PG,
  Update_PG,
  Delete_PG,
  GetAll_M,
  GetById_M,
  GetByName_M,
  Create_M,
  Update_M,
  Delete_M
};
