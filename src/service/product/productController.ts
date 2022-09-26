import { ProductService } from './productService';
const express = require('express');
const router = express.Router();

router.get("/business/:businessId/products", async (req, res,) => {
    try {
        const {id, key} = req.query
        if (id) return res.status(200).json(await ProductService.getProducts(id, ''))
        if (key) return res.status(200).json(await ProductService.getProducts(0, key))
        const products = await ProductService.getBusinessProducts(req.params.businessId)
        return res.status(200).json(products)
      
    }
    catch (e: any) {
        res.status(e.statusCode).json({ "error": e.message })
    }
});



module.exports = router