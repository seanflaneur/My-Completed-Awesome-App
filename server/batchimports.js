const { MongoClient } = require("mongodb");

const { actions } = require("./data");

require("dotenv").config();
// require("dotenv").config({ path: ".env" });

const { MONGO_URI } = process.env;
console.log(MONGO_URI);
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImports = async () => {
  const client = new MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("peaceofmind");

  // await db.collection("usersCollection").insertMany(users);
  await db.collection("actionsCollection").insertMany(actions);

  client.close();
};

batchImports();
