
export {};
const bcrypt = require('bcrypt')
const s = require('./authService') 
const express = require('express');
const router = express.Router();
const passport = require('passport')


const initializePassport = require('../../passport-config')
initializePassport(
     passport, 
     email => users.find(user => user.email === email),
     id => users.find(user => user.id === id)
)
const users : any = []
router.post('/auth/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
}))
router.get('/auth/login', (req, res) => {
    return res.send('Didn\'t work')
})

router.get('/auth/logout', (req: any, res: any) => {

    return res.send(JSON.stringify('Logged in'))
    // productService.get
});
router.post('/auth/register', async (req: any, res: any) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString,
            email: req.body.email,
            password: hashedPass
        })
    }
    catch {

    }

    return res.send(JSON.stringify(users[0]))
    // productService.get
});
router.get('/auth/forget-password', (req: any, res: any) => {

    return res.send(JSON.stringify('Logged in'))
    // productService.get
});
router.get('/auth/reset-password', (req: any, res: any) => {

    return res.send(JSON.stringify('Logged in'))
    // productService.get
});

module.exports = router