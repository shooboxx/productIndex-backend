
export {};
const bcrypt = require('bcrypt')
const s = require('./authService') 
const express = require('express');
const router = express.Router();
const passport = require('passport')
const jwt = require('jsonwebtoken')

let refreshTokens : any = []
const initializePassport = require('../../passport-config')
initializePassport(
     passport, 
     email => users.find(user => user.email === email),
     id => users.find(user => user.id === id)
)
const users : any = []
// router.post('/auth/login', checkNotAuthenticated, passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/auth/login',
//     failureFlash: true
// }))

router.post('/auth/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user)=> {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({name: user.name})
        res.json(accessToken)
    })
})
// router.post('/auth/login', (req, res) => {
//     const username = req.body.username
//     const user = {name: username}
//     const accessToken = generateAccessToken(user)
//     const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
//     refreshTokens.push(refreshToken)
    
//     res.json({accessToken: accessToken, refreshToken: refreshToken})
// })
router.post('/auth/login', (req, res) => {
    const username = getUser(req.body.username, req.body.password)
    if (username !== null) {
        const user = {name: username.username}
        const accessToken = generateAccessToken(user)
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
        refreshTokens.push(refreshToken) 
        res.json({accessToken: accessToken, refreshToken: refreshToken})
    } else {
        res.sendStatus(404)
    }

    
    
})
router.get('/auth/login', authenticateToken, (req, res) => {
    return res.send('Didn\'t work')
})

router.delete('/auth/logout', checkAuthenticated, (req: any, res: any) => {

    req.logOut()
    res.redirect('/login')
    // productService.get
});
router.post('/auth/register', async (req: any, res: any) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10)
        // users.push({
        //     id: Date.now().toString,
        //     email: req.body.email,
        //     password: hashedPass
        // })
        users.push({
            id: Date.now().toString,
            username: req.body.email,
            password: req.body.password
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


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    return res.redirect('/auth/login')
}
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    return next()
}
function authenticateToken (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}

function getUser(userName, password) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == userName && users[i].password == password) {
            return users[i]
        }
    }
    // Raise error. Invalid username or password
    return null
}
module.exports = router