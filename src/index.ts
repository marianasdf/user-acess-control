import express from 'express'

const server = express()

server.get('/', (request, response) => {
  return response.send('his!')
})

server.listen(3000, () => {
  console.log('server running')
})
