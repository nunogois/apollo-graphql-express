import { Aedes } from 'aedes'
import client from './client'

export default (mqtt: Aedes) => {
  mqtt.on('client', client => {
    console.log('client connected', client.id)
  })

  mqtt.on('clientDisconnect', client => {
    console.log('client disconnected', client.id)
  })

  mqtt.publish = (packet, cb) => {
    console.log('Published', packet.payload.toString())
  }
}

client()
