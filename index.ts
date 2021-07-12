import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { Aedes, Server as AedesServer } from 'aedes'
import ws, { createWebSocketStream } from 'ws'
import mqtt from './src/mqtt'

import { typeDefs, resolvers } from './src/graphql/schema'

import example from './src/express/example'

const startWSServer = (broker: Aedes) => {
  const server = new ws.Server({ port: 4000, path: '/ws' })

  mqtt(broker)

  console.log(`🚀 WS Server ready at ws://localhost:4000/ws`)

  server.on('connection', (conn: any, req: any) => {
    const stream = createWebSocketStream(conn)
    broker.handle(stream)
  })
}

const startApolloServer = async (typeDefs: any, resolvers: any) => {
  const server = new ApolloServer({ typeDefs, resolvers })
  await server.start()

  const app = express()
  app.use(example)
  server.applyMiddleware({ app })

  const broker = AedesServer()
  startWSServer(broker)

  app.listen({ port: 3000 }, () => {
    console.log(
      `🚀 Apollo Server ready at http://localhost:3000${server.graphqlPath}`
    )
  })
}

startApolloServer(typeDefs, resolvers)
