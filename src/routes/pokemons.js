const { Router } = require('express')
const router = Router()
const { types, pokemons } = require('../db')

router.get('/', async (req, res) => {
  const { name } = req.query
  if (name) {
    const poke = await pokemons.findOne({ where: { name } })
    if (poke) return res.json(poke)
    return res.status(404).json({ error: "Pokemon doesn't exists" })
  }

  try {
    const poke = await pokemons.findAll({
      include: types
    })
    res.json(poke)
  } catch (error) {
    res.status(404).json({ error: 'There are no pokemons' })
  }
})

router.get('/:idPokemon', async (req, res) => {
  const { idPokemon } = req.params

  try {
    const poke = await pokemons.findOne({ where: { id: Number(idPokemon) } })
    res.json(poke)
  } catch (error) {
    res.status(404).json({ error: 'Pokemon not found' })
  }
})

router.post('/', async (req, res) => {
  const { pokemon, primary, secondary } = req.body
  const name = await pokemons.findByPk(pokemon.name)

  if (!name) {
    try {
      const poke = await pokemons.create({ ...pokemon })
      if (poke) {
        if (secondary) await poke.addTypes([primary, secondary])
        else await poke.addTypes(primary)
        const pokeType = await pokemons.findByPk(poke.name, {
          include: types
        })
        return res.json({ created: 'Pokemon created successfully', pokeType })
      }
    } catch (error) {
      return res.status(404).json({ error: 'Error in the data provided' })
    }
  } else {
    return res.status(422).json({ error: 'That name is taken' })
  }
})

module.exports = router
