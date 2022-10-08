require('dotenv').config()
const { Sequelize } = require('sequelize')
const modelPokemon = require('./models/Pokemon')
const modelType = require('./models/Type')
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT
} = require('./config')

const sequelize = new Sequelize(`postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
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
