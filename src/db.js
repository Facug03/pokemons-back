require('dotenv').config()
const { Sequelize } = require('sequelize')
const modelPokemon = require('./models/Pokemon')
const modelType = require('./models/Type')
const {
  DB_USER, DB_PASSWORD, DB_HOST
} = require('./config')

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pokemon`, {
  logging: false,
  native: false
})

modelPokemon(sequelize)
modelType(sequelize)

const { pokemons, types } = sequelize.models

pokemons.belongsToMany(types, { through: 'typePokemon' })
types.belongsToMany(pokemons, { through: 'typePokemon' })

module.exports = {
  ...sequelize.models,
  sequelize
}
