import { getClientID } from './ws-user-id.js'
const users = new Map()

const clientConnected = (socket) => {
  const id = getClientID()
  socket._id = id
  const userObject = {
    id,
    type: 'connected'
  }
  users.set(id, userObject)
}
const clientClosed = (socket) => {
  users.delete(socket._id)
}
const receivedFingerPrint = (socket, obj) => {
  const id = socket._id
  const userObject = {
    id,
    fingerprint: obj.message,
    type: 'fingerprint'
  }
  users.set(id, userObject)
  sendObject(userObject, socket)
}
const receivedEcho = (socket, obj) => {
  sendObject(obj.message, socket)
}
const sendObject = (obj, socket) => {
  socket.send(JSON.stringify(obj))
}

export {
  clientConnected,
  clientClosed,
  receivedFingerPrint,
  receivedEcho
}
