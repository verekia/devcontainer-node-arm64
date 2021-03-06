const express = require('express')

const knex = require('knex')({
  client: 'pg',
  // connection: 'postgresql://root:password@127.0.0.1:5432/postgres',
  connection: `postgresql://root:password@host.docker.internal:${
    process.env.DB_PORT || '5432'
  }/postgres`,
})

const app = express()
const port = 8000

app.get('/create-table', async (req, res) => {
  console.log('creating table...')
  await knex.schema.createTable('users', table => {
    table.increments()
    table.string('name')
    table.timestamps()
  })
  console.log('table created')
  res.send('OK!')
})

app.get('/create-user', async (req, res) => {
  console.log('creating user...')
  await knex('users').insert({ name: 'Sven' })
  console.log('user created')
  res.send('OK!')
})

app.get('/', async (req, res) => {
  res.send(await knex('users'))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
