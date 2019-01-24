const { connection } = require('../../db/postgresql/db2');
// const { Product: Product_PG } = require('../../db/postgresql/db');
// const { Product: Product_M } = require('../../db/mongo/db');

const { getAsync, setAsync } = require('../../db/redis/redis');

const GetAll_PG = (req, res) => {
  Product_PG.findAll({ limit: 20 })
  .then(products => {
    res.status(200).send(products);
  })
  .catch(err => {
    res.status(500).send({ error: err });
  });
};

const GetById_PG = async (req, res) => {
  const { id } = req.params;

  let redisResult = await getAsync(id);
  if (redisResult) {
    return res.status(200).send(JSON.parse(redisResult));
  }

  try {
    let result = await connection.query('SELECT * FROM products WHERE id = $1', [id]);
    setAsync(id, JSON.stringify(result.rows), 'EX', 60);
    
    if (result.rowCount > 0) {
      return res.status(200).send(result.rows);
    } else {
      return res.status(404).send();
    }
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const GetByName_PG = async (req, res) => {
  const { name } = req.params;

  let redisResult = await getAsync(name);
  if (redisResult) {
    return res.status(200).send(JSON.parse(redisResult));
  }

  try {
    let result = await connection.query('SELECT * FROM products WHERE name = $1', [name]);
    setAsync(name, JSON.stringify(result.rows), 'EX', 60);
  
    if (result.rowCount > 0) {
      return res.status(200).send(result.rows);
    } else {
      return res.status(404).send();
    }
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const Create_PG = async (req, res) => {
  const { name, price, availableOnPrime, numberOfReviews, averageStarRating, image } = req.body;

  try {
    let result = await connection.query('INSERT INTO products (name, price, "availableOnPrime", "numberOfReviews", "averageStarRating", image) VALUES ($1, $2, $3, $4, $5, $6)',
      [name, price, availableOnPrime, numberOfReviews, averageStarRating, image]);
    if (result.rowCount > 0) {
      return res.status(200).send(result.rows);
    } else {
      return res.status(404).send();
    }
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const Update_PG = async (req, res) => {
  const { id } = req.params;
  const { name, price, availableOnPrime, numberOfReviews, averageStarRating, image } = req.body;
  
  try {
    let result = await connection.query(`UPDATE products SET name = ($1), price = ($2), "availableOnPrime" = ($3), "numberOfReviews" = ($4), "averageStarRating" = ($5), image = ($6) WHERE id = ${id}`,
      [name, price, availableOnPrime, numberOfReviews, averageStarRating, image]);
    if (result.rowCount > 0) {
      return res.status(200).send(result.rows);
    } else {
      return res.status(404).send();
    }
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const Delete_PG = async (req, res) => {
  const { id } = req.params;

  try {
    let result = await connection.query('DELETE FROM products WHERE id = $1', [id]);
  
    if (result.rowCount > 0) {
      return res.status(200).send();
    } else {
      return res.status(404).send();
    }
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const GetAll_M = (req, res) => {
  Product_M.find({}).limit(20)
  .then(products => {
    res.status(200).send(products);
  })
  .catch(err => {
    res.status(500).send({ error: err });
  });
};

const GetById_M = (req, res) => {
  const { id } = req.params;
  Product_M.findById(id)
    .then(product => {
      if (product) {
        res.status(200).send(product);
      } else {
        res.status(404).send();
      }
    })
    .catch(err => {
      res.status(500).send({ error: err });
    });
};

const GetByName_M = (req, res) => {
  const { name } = req.params;
  Product_M.findOne({ name })
    .then(product => {
      if (product) {
        res.status(200).send(product);
      } else {
        res.status(404).send();
      }
    })
    .catch(err => {
      res.status(500).send({ error: err });
    });
};

const Create_M = (req, res) => {
  const { name, price, availableOnPrime, numberOfReviews, averageStarRating, image } = req.body;
  Product_M.create({
    name,
    price,
    availableOnPrime,
    numberOfReviews,
    averageStarRating,
    image
  })
    .then((product) => {
      res.status(200).send(product);
    })
    .catch(error => {
      res.status(500).send({ error })
    });
};

const Update_M = (req, res) => {
  const { id } = req.params;
  const { name, price, availableOnPrime, numberOfReviews, averageStarRating, image } = req.body;
  Product_M.findByIdAndUpdate(id, {
    name,
    price,
    availableOnPrime,
    numberOfReviews,
    averageStarRating,
    image
  })
    .then((product) => {
      res.status(200).send(product);
    })
    .catch(error => {
      res.status(500).send({ error })
    });
};

const Delete_M = (req, res) => {
  const { id } = req.params;
  Product_M.findByIdAndDelete(id)
    .then(() => {
      res.status(200).send();
    })
    .catch(err => {
      res.status(500).send({ error: err });
    });
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
