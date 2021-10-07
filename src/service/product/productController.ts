
export {};
const productService = require('../product/productService')
const s = require('./productService') 
const express = require('express');
const router = express.Router();

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

    return res.send(JSON.stringify(s.getAllProducts()))
    // productService.get
});

module.exports = router