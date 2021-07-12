import { connect, MqttClient } from 'mqtt'

const client = () => {
  const client = connect('ws://localhost:4000/ws', {
    clientId: 'client1'
  })

  client.on('connect', function () {
    client.subscribe('presence')
    setInterval(() => client.publish('presence', `Hello MQTT 😃`), 2000)
  })

  client.on('message', function (topic, message) {
    console.log(message.toString())
  })
}

export default client
