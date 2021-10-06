export {}

let businessInventory = require('./../inventory/businessInventoryController')
const express = require('express')
const router = express.Router();
import { BusinessStore } from './storeTypes'

const businessService = require('../business/businessService')
const businessStoreService = require('../store/businessStoreService')


router.get('/store/:storeId', (req, res) => {
    try {
        const storeId = req.params.storeId
        const store : BusinessStore = businessStoreService.getStoreById(storeId)

        res.status(200).json({store})
    }
    catch (e : any) {
        res.status(200).json({"error": e.message})
    }

})
router.put('/store/:storeId', (req, res) => {
    try {

        const storeId = req.params.storeId

        const store : BusinessStore = {
            id: storeId,
            business_id: parseInt(req.body.business_id),
            unique_name: req.body.unique_name,
            email_address: req.body.email_address,
            store_hours: req.body.store_hours,
            phone_1: req.body.phone_1,
            phone_2: req.body.phone_2,
            phone_3: req.body.phone_3,
            address_line_1: req.body.address_line_1,
            address_line_2: req.body.address_line_2,
            country: req.body.country,
            city: req.body.city,
            postal_code: req.body.postal_code,
            is_primary: req.body.is_primary,
            temp_or_perm_closure: req.body.temp_or_perm_closure,
            reopen_date: req.body.reopen_date
        }

        const updated = businessStoreService.updateStore(store)

        res.status(200).json({updated})
    }
    catch (e : any) {
        res.status(200).json({"error": e.message})
    }

})
router.post('/stores', (req, res) => {
    try {
        const storeId = req.params.storeId

        const store : BusinessStore = {
            id: storeId,
            business_id: req.body.business_id,
            unique_name: req.body.unique_name,
            email_address: req.body.email_address,
            store_hours: req.body.store_hours,
            phone_1: req.body.phone_1,
            phone_2: req.body.phone_2,
            phone_3: req.body.phone_3,
            address_line_1: req.body.address_line_1,
            address_line_2: req.body.address_line_2,
            country: req.body.country,
            city: req.body.city,
            postal_code: req.body.postal_code,
            is_primary: req.body.is_primary,
            temp_or_perm_closure: req.body.temp_or_perm_closure,
            reopen_date: req.body.reopen_date
        }
        const newStore = businessStoreService.createStore(store)
        res.status(200).json({newStore})
    }
    catch (e : any) {
        res.status(200).json({"error": e.message})
    }

})
router.delete('/store/:storeId', (req, res) => {
    try {
        const storeId = req.params.storeId

        const store : BusinessStore = businessStoreService.getStoreById(storeId)
        const deleted = businessStoreService.deleteStore(store.id)

        res.sendStatus(200).json({deleted})
    }
    catch (e : any) {
        res.status(200).json({"error": e.message})
    }

})



// deactivate store

module.exports = router 