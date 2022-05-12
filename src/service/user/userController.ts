export {}
const express = require('express');
const router = express.Router()
const userService = require('../user/userService')
const {authenticateToken} = require('../auth/user/userAuthorization.ts')

router.get('/users', async (req, res) => {
    let user = {}
    try {
        const {id, email} = req.query
        if (id) {
            user = await userService.getUserById(id)
            if (user) user['password'] = undefined
            return res.status(200).json(user)
        }
        if (email) {
            user = await userService.getUserByEmail(email)
            if (user) user['password'] = undefined
            return res.status(200).json(user)
        }
        if (user) user['password'] = undefined
        return res.status(200).json(user)
    }
    catch (e : any) {
        res.status(400).json({"error": e.message})
    }
})

router.get('/user', authenticateToken, async (req, res) => {
    try {
        const user = await userService.getUserById(req.user_id)
        return res.status(200).json(user)
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
router.put('/user', authenticateToken, (req, res) => {
    try {
        const user = {
            id: req.user_id,
            role_id: 0,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            dob: req.body.dob,
            gender: req.body.gender,
            country: req.body.country,
            city: req.body.city,
            primary_phone: req.body.primary_phone,
            address: req.body.address,
        }
        const updatedUser = userService.updateUserProfile(user)
        return res.status(200).json(updatedUser)
    }
    catch (e : any) {
        res.status(400).json({"error": e.message})
    }
})
// TODO: Add an upload profile photo route
// TODO: Add a Remove profile photo route

router.put('/user/password', authenticateToken, (req, res) => {
    try {
        const updatedUser = userService.updatePassword(req.user_id, req.body.email_address, req.body.password, req.body.password_confirm)
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