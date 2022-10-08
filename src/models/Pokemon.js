const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('pokemons', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    created: {
      type: DataTypes.BOOLEAN
    },
    hp: {
      type: DataTypes.STRING
    },
    attack: {
      type: DataTypes.STRING
    },
    defense: {
      type: DataTypes.STRING
    },
    speed: {
      type: DataTypes.STRING
    },
    atesp: {
      type: DataTypes.STRING
    },
    defesp: {
      type: DataTypes.STRING
    },
    url: {
      type: DataTypes.TEXT
    }
  }, {
    timestamps: false
  }
  )
}
