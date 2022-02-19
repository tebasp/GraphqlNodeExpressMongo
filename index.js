require('dotenv').config()

const express = require('express')
const { makeExecutableSchema } = require('graphql-tools')
const { graphqlHTTP } = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')

const resolvers = require('./lib/resolvers')

const port = process.env.port || 3000

const app = express()

// Schema
const typeDefs = readFileSync(join(__dirname, 'lib', 'schema.graphql'), 'utf-8')

const schema = makeExecutableSchema({ typeDefs, resolvers })

// Server
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
)

app.listen(port, () => {
  console.log(`Server is listening at port: http://localhost:${port}`)
})
