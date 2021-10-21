export {}
const express = require('express');
const router = express.Router()
const businessService = require('../business/businessService')
const reviewService = require('../reviews/reviewService')

//Get User Businesses
router.get('/user/:userid/businesses', (req, res) => {
    try {
        return res.status(200).json(businessService.getUserBusinesses(req.params.userId))
    }
    catch(e) {
        res.status(200).json({"error": e})
    }
})

// Get user reviews
router.get('/user/:userid/reviews', (req, res) => {
    try {
        return res.status(200).json(reviewService.getUserReviews(req.params.userId))
    }
    catch(e) {
        res.status(200).json({"error": e})
    }
})

// Deactivate user
// Delete User
// UpdateUserProfile
// Get user by Id
// Get User by email address