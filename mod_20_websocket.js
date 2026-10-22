import { WebSocketServer } from 'ws'
import { clientConnected, clientClosed, receivedFingerPrint, receivedEcho } from './websocket/ws-user.js'

function startWebsocketServer (server) {
  console.logD('DEBUG: Module: websocket: ')
  const wsServer = new WebSocketServer({ server })
  wsServer.on('connection', clientConnection)
}

function clientConnection (socket) {
  clientConnected(socket)
  socket.on('message', (json) => routeMessage(json, socket))
  socket.on('close', () => clientClosed(socket))
}

function routeMessage (json, socket) {
  try {
    const obj = JSON.parse(json)
    if (obj.type === 'fingerprint') {
      receivedFingerPrint(socket, obj)
      return
    }
    if (obj.type === 'echo') {
      receivedEcho(socket, obj)
    }
  } catch (err) {
    console.error('DEBUG: Failed to parse WebSocket message:', err)
  }
}

export { startWebsocketServer }
