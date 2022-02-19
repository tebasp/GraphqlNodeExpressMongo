const { MongoClient } = require('mongodb')

const { DB_PASSWORD, DB_NAME, DB_MONGO_CLUSTER, DB_MONGO_PROJECT } = process.env

const mongoUri = `mongodb+srv://${DB_MONGO_PROJECT}:${DB_PASSWORD}@${DB_MONGO_CLUSTER}.9smly.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
let connection

async function connectDB() {
  if (connection) return connection

  let client

  try {
    client = await MongoClient.connect(mongoUri)
    connection = client.db(DB_NAME)
    return connection
  } catch (e) {
    console.log('Error conectando a la DB', e)
  }
}

module.exports = connectDB
