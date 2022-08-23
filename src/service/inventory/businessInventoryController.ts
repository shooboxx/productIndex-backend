export {};
import { InventoryService } from "./businessInventoryService";
const express = require('express');
const router = express.Router();


router.get('/store/:storeId/inventory', async (req, res) => {
    try {
        const storeId = req.params.storeId 
        const inventory_items = await InventoryService.getAllStoreItems(storeId)
        return res.status(200).json(inventory_items)
    }
    catch (e : any) {
        return res.status(200).json({"error": e.message})
    }

});

router.get('/inventory/:itemId', (req, res) => {
    try {
        const itemId = req.params.itemId
        const item = InventoryService.getInventoryItemById(itemId)
        return res.status(200).json({item})
    }
    catch (e : any) {
        return res.status(200).json({"error": e.message})
    }
});



module.exports = router