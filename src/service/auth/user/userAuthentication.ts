import { UserLogin, User } from "../../user/userType";


export {};
const bcrypt = require('bcrypt')
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const userService = require('../../user/userService')
let refreshTokens : any = []
const {adminOnlyAccess, hasAccessLevel} = require('./userAuthorization')
const crypto = require('crypto')

// Created user : Tested : Working
router.post('/auth/register', async (req: any, res: any) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10)
        const user : User = {
            id: 1,
            role_id: getRoleID('user'),
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email_address: req.body.email_address,
            password: hashedPass,
            dob: '',
            insert_date: Date.now(),
            active: true,
            is_verified: false

        }
        const newUser = userService.createUser(user)
    return res.send(JSON.stringify(newUser))
    }
    catch(err : any)  {
        return res.status(400).json({error: err.message})
    }

});
// Sign in : Tested : Worked
router.post('/auth/login', checkNotAuthenticated, async (req, res) => {
    try{
        const user = userService.getUserLoginByEmail(req.body.email_address)
        console.log('This ran')
        await bcrypt.compare(req.body.password, user.password, (err, resp) => {
            if (err) res.sendStatus(404)
            if (resp){
                const accessToken = generateAccessToken({userID: user.id})
                const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
                refreshTokens.push(refreshToken) 
                return res.json({access_token: accessToken, refresh_token: refreshToken})
            }
            return res.json({"error": "Email address or password is incorrect"})
        } ) 
    }
    catch(e : any) { 
        return res.status(200).json({"error": e.message}) 
    }
})

router.delete('/auth/logout', authenticateToken, (req: any, res: any) => {

    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
});

// Forget password : Tested : Works :TODO = Send email with token to user
router.post('/auth/forget-password', checkNotAuthenticated, async (req: any, res: any) => {

    let resetToken 
    try {
        const user = userService.getUserLoginByEmail(req.body.email_address)
        resetToken = await createUserPasswordResetToken(user.id)
        return res.json({reset_token: resetToken})
    }
    catch(err : any) {
        res.status(200).json({"error": err.message})
    }

});

router.post('/auth/reset-password/:resetToken', async (req: any, res: any) => {
    try {
        const user = userService.getUserLoginByEmail(req.body.emailAddress)
        await bcrypt.compare(req.params.resetToken, user.passwordResetToken, (err, resp) => {
            if (resp) {
                if (user.password_reset_expires_in < Date.now()) {
                    return res.status(200).send("Token expired")
                }
                // Find users by the reset token instead of email
                // check to see if new password matches old password
                // -- if same as old password, prompt user that they cannot use a password that they've used previously
                // check to see if new password and verify new password is the same.
                // -- if it doesn't, tell user that password is not the same
                // -- if it does, then allow user to update password. Call the updateUserLogin func
                // -- destroy active sessions and remember me cookies
                // delete reset token and tokenexpiry
                // 
                
                return res.status(200).send('works')
                
            }
            if (err) {
                return res.sendStatus(400)
            }
            return res.sendStatus(400).json({error: 'Invalid token'})
        })
    }
    catch (e){
        return res.status(400).send(e) 
    }
});

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

async function createUserPasswordResetToken (userId)  {
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedResetToken =  await bcrypt.hash(resetToken, 10)
    const userResetTokenExpiry = Date.now() * 10 * 60 * 1000;
    const user : UserLogin = {
        id: userId,
        email_address: '',
        password: '',
        password_reset_token: hashedResetToken,
        password_reset_expires_in: userResetTokenExpiry
    }
    userService.updateUserLogin(user);
    return resetToken
}

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