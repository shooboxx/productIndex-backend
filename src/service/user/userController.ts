export {}
const express = require('express');
const router = express.Router()
const businessService = require('../business/businessService')
const reviewService = require('../reviews/reviewService')
const userService = require('../user/userService')
const {authenticateToken} = require('../auth/user/userAuthorization.ts')

//Get User Businesses
router.get('/user/:userid/businesses', (req, res) => {
    try {
        return res.status(200).json(businessService.getUserBusinesses(req.params.userId))
    }
    catch(e : any) {
        res.status(200).json({"error": e.message})
    }
})

//Get user reviews
router.get('/user/:userid/reviews', (req, res) => {
    try {
        return res.status(200).json(reviewService.getUserReviews(req.params.userId))
    }
    catch(e : any) {
        res.status(200).json({"error": e.message})
    }
})

router.get('/user/:userid', async (req, res) => {
    try {
        return res.status(200).json(await userService.getUserById(req.params.userid))
    }
    catch (e : any) {
        res.status(400).json({"error": e.message})
    }
})

router.delete('/user', authenticateToken, (req, res) => {
    try {
        return res.status(200).json(userService.deleteUser(req.user_id))
    }
    catch (e : any) {
        res.status(400).json({"error": e.message})
    }
})

router.put('/user/profile', authenticateToken, (req, res) => {
    try {
        const user = {
            id: req.user_id,
            role_id: 0,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email_address: '',
            password: '',
            dob: req.body.dob,
            gender: req.body.gender,
            profile_picture_url: req.body.profile_picture_url,
            country: req.body.country,
            city: req.body.city,
            primary_phone: req.body.primary_phone,
            address: req.body.address,
            is_verified: false,
            active: false,
            deleted_date: 0,
            insert_date: 0,
            update_date: 0,  
        }
        const updatedUser = userService.updateUserProfile(user)
        return res.status(200).json(updatedUser)
    }
    catch (e : any) {
        res.status(400).json({"error": e.message})
    }
})

router.put('/user/password', authenticateToken, (req, res) => {
    try {
        const updatedUser = userService.updatePassword(req.user_id, req.body.email_address, req.body.password, req.body.password_confirm)
        return res.status(200).json(updatedUser)
    }
    catch (e : any) {
        res.status(400).json({"error": e.message})
    }
})

router.put('/user/verify', async (req, res) => {
    try {
        const updatedUser = await userService.verifyUser(req.user_id)
        return res.status(200).json(updatedUser)
    }
    catch (e : any) {
        res.status(400).json({"error": e.message})
    }
})

router.put('/user/active', authenticateToken, (req, res) => {
    try {
        const updatedUser = userService.setAciveStatus(req.user_id, req.body.is_active)
        return res.status(200).json(updatedUser)     
    }
    catch (e : any) {
        res.status(400).json({"error": e.message})
    }
})


module.exports = router