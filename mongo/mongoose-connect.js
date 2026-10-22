import mongoose from 'mongoose'

const connectionString = process.env.MONGO

// 10 seconds timeout
const connectionParams = {
  serverSelectionTimeoutMS: 10000
}

mongoose.connect(connectionString, connectionParams).then(() => {
  console.logD('DEBUG: mongoose: connected: ', 'green')
}).catch((err) => {
  console.logD('DEBUG: mongoose: error: not connected: ', 'red')
})
