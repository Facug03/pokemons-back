const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('types', {
    primaryType: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    }
  }, { timestamps: false })
}
