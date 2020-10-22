const router = require('express').Router()
const {
    createProduct,
    getProducts,
    deleteProduct,
    updateProduct } = require("../api/products.api")

router.get('/', async (req, res) => {
    res.send(await getProducts())
})

router.post('/', async (req, res) => {
    const newProduct = req.body
    await createProduct(newProduct)
    res.send({
        status: 200,
        message: "New Product Added",
        allProducts: await getProducts(),
        success: true
    })
})

router.delete('/:id', async (req, res) => {
    await deleteProduct(res.params.id)
    res.send({ message: "Product deleted successfully" })
})

router.put('/:id', async (req, res) => {
    const updatedProduct = req.body
    const id = req.params.id
    await updateProduct(id, updatedProduct)
    res.send({ message: "Product Updated Successfully" })
})

module.exports = router