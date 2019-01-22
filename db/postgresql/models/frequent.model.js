module.exports = (connection, Sequelize) => {
  return connection.define('frequent', {
    id_product_1: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'products',
        key: 'id'
      },
      allowNull: false,
      unique: 'frequents_unique'
    },
    id_product_2: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'products',
        key: 'id'
      },
      allowNull: false,
      unique: 'frequents_unique'
    }
  }, {
    timestamps: false,
  });
};
