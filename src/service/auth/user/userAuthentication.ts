import { UserLogin, User } from "../../user/userType";
const { authenticateToken } = require('./userAuthorization')

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
router.post('/api/auth/register', checkNotAuthenticated, async (req: any, res: any) => {
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
router.post('/api/auth/login', checkNotAuthenticated, async (req, res) => {
    try{
        const user = userService.getUserLoginByEmail(req.body.email_address)
        await bcrypt.compare(req.body.password, user.password, (err, resp) => {
            if (err) res.sendStatus(404)
            if (resp){
                const accessToken = generateAccessToken({user_id: user.id})
                const refreshToken = jwt.sign({user_id: user.id}, process.env.REFRESH_TOKEN_SECRET)
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

router.delete('/api/auth/logout', authenticateToken, (req: any, res: any) => {

    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
});

// Forget password : Tested : Works :TODO = Send email with token to user
router.post('/api/auth/forgot-password', checkNotAuthenticated, async (req: any, res: any) => {

    let resetToken 
    try {
        let user = userService.getUserLoginByEmail(req.body.email_address)
        
        resetToken = await createUserPasswordResetToken(user.id)
        const updatedUser = userService.updateUserLogin(user);
        return res.status(200).json({reset_token: updatedUser.password_reset_token}) 
    }
    catch(err : any) {
        return res.status(200).json({"error": err.message})
    }

});

router.post('/api/auth/reset-password/:resetToken', checkNotAuthenticated, async (req: any, res: any) => {
    try {
        const resetToken = req.params.resetToken
        // Should check if we're saving and getting an encrypted resetToken from the database for comparison
        const user = userService.getUserLoginByResetToken(resetToken)
        const newPassword = req.body.password
        const newPasswordConfirm = req.body.password_confirm
        if (user) {
            if (user.password_reset_expires_in < Date.now()) {
                res.status(200).json({"error": "Token expired"})
            }
            if (newPassword !== newPasswordConfirm) {
                res.status(200).json({"error": "Passwords do not match"})
            }
            user.password = await bcrypt.hash(req.body.password, 10)
            user.password_reset_token = null
            user.password_reset_expires_in = null

            userService.updateUserLogin(user)
            return res.status(200).send('success')
        }
       

        // -- TODO: destroy active sessions and remember me cookies
    
            return res.status(400).json({error: 'Invalid token'})
    }
    catch (e : any){
        return res.status(400).send(e.message) 
    }
});

router.post('/api/auth/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user)=> {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({user_id: user.user_id})
        return res.json({access_token: accessToken})
    })
})

async function createUserPasswordResetToken (userId)  {
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
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
    // expiration time should be 15m in prod
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.NODE_ENV == 'development' ? '1440m' : '15m'})
}


function getRoleID(roleName) {
    return 1
}
module.exports = router