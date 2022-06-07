
export {};
const productService = require('./productService')
const express = require('express');
const router = express.Router();
import { Product } from './productType'
const { authenticateToken } = require("../auth/user/userAuthorization.ts");

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


router.get('/product/:productId', async (req: any, res: any) => {
    try {
        const pId = req.params.productId
        const products = await productService.getProductById(pId)
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
            product_name: req.body.product_name,
            product_type: req.body.product_type,
            image_url: req.body.image_url,
            created_by: req.user.id,
        }
        const updatedProduct = productService.updateProduct(product)
        res.status(200).json({updatedProduct})
    }
    catch (e : any) {
        res.status(200).json({"error": e.message})
    }

});


router.post("/product", authenticateToken, async (req: any, res: any) => {
    try {
        const product = {
            product_name: req.body.product_name,
            business_id: req.body.business_id,
            product_type: req.body.product_type,
            image_url: req.body.image_url,
            product_key: req.body.product_key,
            created_by: req.user_id,
        }
        const newProduct = await productService.createProduct(product)
        return res.status(200).json({newProduct})
    }
    catch (e) {
        throw e
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