const { getDatabase } = require('./config')
const { ObjectID } = require('mongodb')

const collectionName = "restaurantDishes"

async function createProduct(product) {
    const database = await getDatabase()
    const { insertedId } = await database.collection(collectionName).insertOne(product)
    return insertedId
}

async function getProducts() {
    const database = await getDatabase()
    return await database.collection(collectionName).find({}).toArray()
}

async function deleteProduct(id) {
    const database = await getDatabase()
    await database.collection(collectionName).deleteOne({
        _id: new ObjectID(id)
    })
}

async function updateProduct(id, product) {
    const database = await getDatabase()
    delete product._id

    await database.collection(collectionName).update(
        { _id: new ObjectID(id) },
        {
            $set: {
                ...product,
            }
        }
    )
}

module.exports = {
    createProduct,
    getProducts,
    deleteProduct,
    updateProduct
}