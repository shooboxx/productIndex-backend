export {}
const express = require('express');
const router = express.Router()
const userService = require('../user/userService')
const {authenticateToken} = require('../auth/user/userAuthorization.ts')

router.get('/users', async (req, res) => {
    let user = {}
    const {id, email} = req.query
    try {
        if (id) user = await userService.getUserById(id)
        if (email) user = await userService.getUserByEmail(email)
        if (user) {
            user['password'] = undefined
            user['deleted_date'] = undefined
        }

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


router.delete('/user', authenticateToken, async (req, res) => {
    try {
        return res.status(200).json(await userService.deleteUser(req.user_id))
    }
    catch (e : any) {
        res.status(400).json({"error": e.message})
    }
})
router.put('/user', authenticateToken, async (req, res) => {
    try {
        const user = {
            id: req.user_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            dob: req.body.dob,
            gender: req.body.gender,
            country: req.body.country,
            city: req.body.city,
            primary_phone: req.body.primary_phone,
            state: req.body.state,
        }
        const updatedUser = await userService.updateUserProfile(user)
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



module.exports = router