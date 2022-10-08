const PORT = process.env.PORT || 3001
const DB_USER = process.env.DB_USER || 'postgres'
const DB_PASSWORD = process.env.DB_PASSWORD || 'password'
const DB_HOST = process.env.DB_HOST || 'localhost:5432'

module.exports = {
  PORT,
  DB_USER,
  DB_PASSWORD,
  DB_HOST
}
