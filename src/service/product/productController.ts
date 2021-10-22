
export {};
const productService = require('./productService')
const express = require('express');
const router = express.Router();
import { Product } from './productType'

router.get('business/:businessId/products', (req: any, res: any) => {
    try {
        const bizId = req.params.businessId
        const bizProducts = productService.getBusinessProducts(bizId)
        return res.status(200).json({bizProducts})
    }
    catch (e) {
        res.status(200).json({"error": e})
    }
});


router.get('/product/:productId', (req: any, res: any) => {
    try {
        const pId = req.params.productId
        const products = productService.getProductById(pId)
        res.status(200).json({products})
    }
    catch (e : any) {
        res.status(200).json({"error": e.message})
    }

});

router.put('/product/:productId', (req: any, res: any) => {
    try {
        const pId = req.params.productId

        const product : Product = {
            id: pId,
            name: req.body.product_name,
            type: req.body.product_type,
            image_url: req.body.image_url,
            created_by: req.user.id,
            update_date: Date.now()
        }
        const updatedProduct = productService.updateProduct(product)
        res.status(200).json({updatedProduct})
    }
    catch (e : any) {
        res.status(200).json({"error": e.message})
    }

});

router.post('/product', (req: any, res: any) => {
    try {
        const product : Product = {
            name: req.body.product_name,
            type: req.body.product_type,
            image_url: req.body.image_url,
            created_by: req.user.id,
            insert_date: Date.now()
        }
        const newProduct = productService.createProduct(product)
        res.status(200).json({newProduct})
    }
    catch (e : any) {
        res.status(200).json({"error": e.message})
    }

});

router.delete('/product/:productId', (req: any, res: any) => {
    try {
        const pId = req.params.productId
        const product = productService.deleteProduct(pId)
        res.status(200).json({product})
    }
    catch (e : any) {
        res.status(200).json({"error": e.message})
    }

});

module.exports = router