const axios = require('axios')

const { Router } = require('express')
const router = Router()
const { types, pokemons } = require('../db')

router.get('/', async (req, res) => {
  axios(
    'https://api.brawlstars.com/v1/players/%23GRCJCL02?authorization=Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImQ5ODVlZmU3LWVlNmMtNGZkOS1iOTI5LThhMTBjNGFhNmQyMiIsImlhdCI6MTY3MjY3NjI4OCwic3ViIjoiZGV2ZWxvcGVyLzNhZDRhZDlkLWIwNmEtZjBkYi00YWQyLTJhYzM2MDRlYjU5YiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMzQuNjguMjQuOTMiXSwidHlwZSI6ImNsaWVudCJ9XX0.-3tbMStXrXfNGHc0CoVSDwEciY5nzz13isrRj5MjRwwfj5LhKsOKFSzRqp0xmiLTfw_v3iqzkeyF6DAbnjsy7w'
  )
    .then((resp) => {
      console.log(resp.data)
      res.json(resp.data)
    })
    .catch((err) => {
      console.log(err)
      res.json(err)
    })
  // const { name } = req.query

  // if (name) {
  //   const poke = await pokemons.findOne({ where: { name } })
  //   if (poke) return res.json(poke)
  //   return res.status(404).json({ error: "Pokemon doesn't exists" })
  // }

  // try {
  //   const poke = await pokemons.findAll({
  //     include: types
  //   })
  //   res.json(poke)
  // } catch (error) {
  //   res.status(404).json({ error: 'There are no pokemons' })
  // }
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
          include: types,
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
