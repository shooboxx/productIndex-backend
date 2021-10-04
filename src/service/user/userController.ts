export {}
const express = require('express');
const router = express.Router()
const businessService = require('../business/businessService')

//Get User Businesses
router.get('/user/:userid/businesses', (req, res) => {
    try {
        return res.status(200).json(businessService.getUserBusinesses(req.params.userId))
    }
    catch(e) {
        res.status(200).json({"error": e})
    }
})