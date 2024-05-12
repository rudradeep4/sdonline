import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';


const client = new MongoClient(process.env.MONGODB_URL)

async function database(req, res, next) {
  req.dbClient = client
  req.db = client.db('Cluster0')
  return next()
}

const middleware = nextConnect()

middleware.use(database)

export default middleware