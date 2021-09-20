export {}

let businessInventory = require('./../inventory/businessInventoryController')
const express = require('express')
const router = express.Router();

router.use('/store/:store_id/', businessInventory)



module.exports = router 