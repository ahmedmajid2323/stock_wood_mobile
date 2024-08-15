const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/produit.controller.js')

router.post('/add_product', ProductController.add_product )
router.post('/add_cout/:id', ProductController.add_cout )
router.post('/add_stock/:id', ProductController.add_stock )
router.get('/all_stock_inf', ProductController.all_stock_inf )

module.exports = router