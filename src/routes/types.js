const axios = require('axios')
const { Router } = require('express')
const router = Router()
const { types } = require('../db')

router.get('/', async (req, res) => {
  const type = await types.findAll({ where: { primaryType: 'dark' } })
  if (typeof type[0] !== 'undefined') {
    const allTypes = await types.findAll()
    return res.json(allTypes)
  }
  try {
    const type = await axios.get('https://pokeapi.co/api/v2/type').then(resp => resp.data.results)
    const typeMap = type.map(typeP => {
      return {
        primaryType: typeP.name
      }
    })
    const typesPoke = await types.bulkCreate(typeMap)
    res.json(typesPoke)
  } catch (error) {
    res.status(404).json({ error: 'error' })
  }
})

module.exports = router
