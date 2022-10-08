const server = require('./src/app.js')
const { sequelize } = require('./src/db.js')
const { PORT } = require('./src/config')

sequelize.sync().then(() => {
  server.listen(PORT)
})
