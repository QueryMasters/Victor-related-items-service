module.exports = (connection, Sequelize) => {
  return connection.define('related', {
    id_product_1: {
      type: Sequelize.INTEGER,
      references: {
        model: 'products',
        key: 'id'
      },
      allowNull: false
    },
    id_product_2: {
      type: Sequelize.INTEGER,
      references: {
        model: 'products',
        key: 'id'
      },
      allowNull: false
    }
  });
};
