import express from 'express'
// import mqtt from 'mqtt'

// const client = mqtt.connect('ws://localhost:4000/ws', {
//   clientId: 'client1'
// })

// client.on('connect', function () {
//   client.subscribe('presence')
//   setInterval(() => client.publish('presence', `Hello MQTT 😃`), 2000)
// })

// client.on('message', function (topic, message) {
//   console.log(message.toString())
// })

const router = express.Router()

router.get('/', (_, res) => {
  res.send('Welcome to the API.')
})

export default router
