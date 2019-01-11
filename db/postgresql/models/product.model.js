module.exports = (connection, Sequelize) => {
  return connection.define('product', {
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    availableOnPrime: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    numberOfReviews: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    averageStarRating: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
};
