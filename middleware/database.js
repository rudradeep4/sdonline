import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const client = new MongoClient(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xckv1my.mongodb.net/`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

async function database(req, res, next) {
  req.dbClient = client
  req.db = client.db('Cluster0')
  return next()
}

const middleware = nextConnect()

middleware.use(database)

export default middleware