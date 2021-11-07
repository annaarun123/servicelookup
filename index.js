const express = require('express')
const app = express()
const db = require('./queries')
const port = 3000

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/services', db.getServices)
app.get('/service/:id', db.getServiceById)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})