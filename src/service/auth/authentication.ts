
export {};
const bcrypt = require('bcrypt')
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const userService = require('../user/userService')
let refreshTokens : any = []
const {adminOnlyAccess, hasAccessLevel} = require('./authorization')

router.post('/auth/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user)=> {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({name: user.name})
        return res.json(accessToken)
    })
})

router.post('/auth/login', checkNotAuthenticated, async (req, res) => {
    try{
        const user = userService.getUser(req.body.emailAddress)
        await bcrypt.compare(req.body.password, user.password, (err, resp) => {
            if (err) res.sendStatus(404)
            if (resp){
                const accessToken = generateAccessToken({userID: user.id})
                const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
                refreshTokens.push(refreshToken) 
                return res.json({accessToken: accessToken, refreshToken: refreshToken})
            }
            return res.json({"error": "Email address or password is incorrect"})
        } ) 
    }
    catch {
        return res.json({"error": "Email address or password is incorrect"}) 
    }
})

router.delete('/auth/logout', authenticateToken, (req: any, res: any) => {

    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
});
router.post('/auth/register', async (req: any, res: any) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10)
        const user = {
            id: 0,
            roleId: getRoleID('user'),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailAddress: req.body.email,
            password: hashedPass,
            dob: '',
            insertDate: Date.now(),
            active: true

        }
        const newUser = userService.createUser(user)
    return res.send(JSON.stringify(newUser))
    }
    catch(err : any)  {
        console.log()
        return res.status(400).json({error: err.message})
    }

});

router.get('/auth/forget-password', checkNotAuthenticated, (req: any, res: any) => {

    return res.send(JSON.stringify('Logged in'))
    // productService.get
});
router.get('/auth/reset-password', (req: any, res: any) => {

    return res.send(JSON.stringify('Logged in'))
    // productService.get 
});

function authenticateToken (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        return next()
    })
}
function checkNotAuthenticated (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return next()
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    }
    catch {
        return next()
    }
    
    return res.status(403).json({"error": "user already logged in"})
}

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}


function getRoleID(roleName) {
    return 1
}
module.exports = router