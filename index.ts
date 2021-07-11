import express from 'express'
import { ApolloServer } from 'apollo-server-express'

import { typeDefs, resolvers } from './src/graphql/schema'

import example from './src/express/example'

async function startApolloServer(typeDefs: any, resolvers: any) {
  const server = new ApolloServer({ typeDefs, resolvers })
  await server.start()

  const app = express()
  app.use(example)
  server.applyMiddleware({ app })

  app.listen({ port: 3000 }, () => {
    console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
  })
}

startApolloServer(typeDefs, resolvers)
