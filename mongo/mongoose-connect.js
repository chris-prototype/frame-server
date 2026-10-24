import mongoose from 'mongoose'

const connectionString = process.env.MONGO

if(connectionString) {
  mongoose.connect(connectionString, { serverSelectionTimeoutMS: 10000 }).then(() => {
    console.logD('DEBUG: mongoose: connected: ', 'green')
  }).catch((err) => {
    console.logD('DEBUG: mongoose: error: not connected: ', 'red')
    console.log(err)
  })
} else {
  console.logD('DEBUG: mongoose: error: connection string not supplied: ', 'red')  
}

