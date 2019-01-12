const { Product: Product_PG } = require('../../db/postgresql/db');
const { Product: Product_M } = require('../../db/mongo/db');

const GetAll_PG = (req, res) => {
  Product_PG.findAll({ limit: 20 })
  .then(products => {
    res.status(200).send(products);
  })
  .catch(err => {
    res.status(500).send({ error: err });
  });
};

const GetById_PG = (req, res) => {
  const { id } = req.params;
  Product_PG.findById(id)
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

const GetByName_PG = (req, res) => {
  const { name } = req.params;
  Product_PG.findOne({ where: { name } })
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

const Create_PG = (req, res) => {
  const { name, price, availableOnPrime, numberOfReviews, averageStarRating, image } = req.body;
  Product_PG.create({
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

const Update_PG = (req, res) => {
  const { id } = req.params;
  const { name, price, availableOnPrime, numberOfReviews, averageStarRating, image } = req.body;
  Product_PG.update({
    name,
    price,
    availableOnPrime,
    numberOfReviews,
    averageStarRating,
    image
  }, {
    where: { id }
  })
    .then((product) => {
      res.status(200).send(product);
    })
    .catch(error => {
      res.status(500).send({ error })
    });
};

const Delete_PG = (req, res) => {
  const { id } = req.params;
  Product_PG.destroy({ where: { id } })
    .then(() => {
      res.status(200).send();
    })
    .catch(err => {
      res.status(500).send({ error: err });
    });
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
