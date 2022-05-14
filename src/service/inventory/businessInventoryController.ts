import { BusinessItem } from "./businessInventoryType";
import { Product } from '../product/productType'
export {};
const productService = require('../product/productService')
const inventoryService = require('./businessInventoryService') 
const express = require('express');
const router = express.Router();

// ERRORS
const NoItemsErr = 'No items available at this store'
const NoItemsFoundErr = 'No items were found that matches that search'


router.get('/store/:storeId/inventory', (req, res) => {
    try {
        const storeId = req.params.storeId 
        const inventory_items = inventoryService.getStoreInventory(storeId)
        return res.status(200).json({inventory_items})
    }
    catch (e : any) {
        return res.status(200).json({"error": e.message})
    }

});


router.get('/inventory/:itemId', (req, res) => {
    try {
        const itemId = req.params.itemId
        const item = inventoryService.getInventoryItemById(itemId)
        return res.status(200).json({item})
    }
    catch (e : any) {
        return res.status(200).json({"error": e.message})
    }
});


router.put('/inventory/:itemId', (req, res) => {
    try {
        const itemId = req.params.itemId
        const product : Product = productService.getProductByID(req.body.product_id);

        const item : BusinessItem = {
            id: itemId,
            business_id: req.body.business_id,
            product_key: req.body.product_key,
            product: product,
            tag: req.body.tag,
            description: req.body.description,
        }

        const updatedItem = inventoryService.updateInventoryItem(item)
        return res.status(200).json({updatedItem})
    }
    catch (e : any) {
        return res.status(200).json({"error": e.message})
    }
});


router.post('/inventory', (req, res) => {
    try {
        const itemId = req.params.itemId
        const product : Product = productService.getProductByID(req.body.product_id)
        const item : BusinessItem = {
            id: itemId,
            business_id: req.body.business_id,
            product_key: req.body.product_key,
            product: product,
            tag: req.body.tag,
            description: req.body.description,
        }

        const newItem = inventoryService.updateInventoryItem(item)
        return res.status(200).json({newItem})
    }
    catch (e : any) {
        return res.status(200).json({"error": e.message})
    }
});

router.delete('/inventory/:itemId', (req, res) => {
    try {
        const itemId = req.params.itemId
        inventoryService.deleteInventoryItem(itemId)
    }
    catch (e: any) {
        return res.status(200).json({"error": e.message})
    }
})



module.exports = router