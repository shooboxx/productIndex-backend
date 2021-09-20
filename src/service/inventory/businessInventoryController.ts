
export {};

const s = require('./businessInventoryService') 
const express = require('express');
const router = express.Router();

// ERRORS
const NoItemsErr = 'No items available at this store'
const NoItemsFoundErr = 'No items were found that matches that search'

router.get('/items', (req: any, res: any) => {
    const {store_id} = req.params
    const data = s.getAllInventories(store_id);

    if (data.length == 0) {
        return res.status(404).json({
            "status": "failed",
            "results": 0,
            "error": NoItemsErr
        })
    }
    return res.status(200).json({
        "status": "success",
        "results": data.length,
        "data": data
    })
    // productService.get
});
router.get('/item/:inventory_id', (req: any, res: any) => {
        const {inventory_id, store_id} = req.params
    return res.send(s.getInventory( inventory_id, store_id))
    // productService.get
});

router.post('/item', (req: any, res: any) => {

    return res.send(JSON.stringify(s.createInventory(req.body)))
    // return res.send(s.addInventory({
    //     id,
    //     product: {

    //     }
    // }))
});
module.exports = router