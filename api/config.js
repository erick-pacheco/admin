/**
  All configuration that is required for a shared mongo server hosted in the cloud
 */

const { MongoClient } = require("mongodb")
let database = null

async function startDatabase() {
    const mongoDBURL = `mongodb://mlab2020:abc123def!@ds031617.mlab.com:31617/learningmongo`
    const connnection = await MongoClient.connect(mongoDBURL, { useNewUrlParser: true }, { useUnifiedTopology: true })
    database = connnection.db()
}

async function getDatabase() {
    if (!database) await startDatabase()
    return database
}


module.exports = {
    getDatabase,
    startDatabase,
};
