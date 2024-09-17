import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;
let client;
let clientPromise;

if (!client) {
  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  clientPromise = client.connect();
}

export async function connectToDB() {
  if (!client.isConnected()) {
    await clientPromise;
  }
  return client.db();
}
