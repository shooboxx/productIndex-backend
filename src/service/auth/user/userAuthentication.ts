import { User } from "../../user/userType";
import { sendEmail } from '../../../utils/email';
import {sendVerificationEmail, sendResetEmail} from '../../email/emailService'

export { };
const bcrypt = require('bcrypt')
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const userService = require('../../user/userService')
let refreshTokens: any = []
const { checkNotAuthenticated, authenticateToken } = require('./userAuthorization')
const crypto = require('crypto')

const systemRoleService = require('./systemRole/systemRoleService')
router.get('/auth/verify', async (req: any, res: any) => {
    try {
        const user : User = await userService.verifyUser(req.query.token)
        if (user) return res.status(200).json({success: true})
    }
    catch (err : any){
        return res.status(400).json({ error: err.message })
    }
    res.sendStatus(400)
})

// Works with database
router.post('/auth/register', checkNotAuthenticated, async (req: any, res: any) => {
    try {
        const hashedPass = await bcrypt.hash(req.body.password, 10)
        const user: User = {
            id: 1,
            role_id: await systemRoleService.getRoleId('USER'),
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email_address: req.body.email_address.toLowerCase(),
            password: hashedPass,
            dob: req.body.dob,
            state: req.body.state,
            city: req.body.city,
            country: req.body.country,
            primary_phone: req.body.primary_phone,
            gender: req.body.gender,
            active: true,
            is_verified: false,
            verify_token: crypto.randomBytes(32).toString('hex')

        }
        const newUser = await userService.createUser(user)
        const verificationLink = `${req.headers.origin}/verify?token=${newUser.verify_token}`
        await sendVerificationEmail({first_name: newUser.first_name, verify_link: verificationLink, email_to: newUser.email_address})

        return res.status(200).json(newUser)
    }
    catch (err: any) {
        return res.status(400).json({ error: err.message })
    }

});
// Works with database
router.post('/auth/login', checkNotAuthenticated, async (req, res) => {
    try {
        
        const user = await userService.getUserByEmail(req.body.email_address.toLowerCase())
        if (!user) res.status(400).json({ "error": "Email address or password is incorrect" })
        await bcrypt.compare(req.body.password, user.password, async (err, resp) => {
            if (err) res.status(404)
            if (resp) {
                const accessToken = generateAccessToken({ user_id: user.id })
                const refreshToken = jwt.sign({ user_id: user.id }, process.env.REFRESH_TOKEN_SECRET)
                const hashed_token = crypto.createHash('sha256').update(refreshToken).digest('hex')
                await userService.storeRefreshToken(user.id, hashed_token).catch((e)=> {res.status(400).json({error: e.message})})
                res.cookie("access_token", accessToken, {
                    httpOnly: true,
                    Secure: true
                })
                res.cookie("refresh_token", refreshToken, {
                    httpOnly: true,
                    Secure: true
                })
                res.setHeader('Access-Control-Allow-Credentials', true);
                
                return res.status(200).json({ access_token: accessToken, refresh_token: refreshToken })
            }
            return res.status(400).json({ "error": "Email address or password is incorrect" })
        })

    }
    catch (e: any) {
        return res.status(200).json({ "error": e.message })
    }
})

router.delete('/auth/logout', async (req: any, res: any) => {
    const hashed_token = crypto.createHash('sha256').update(req.cookies.refresh_token).digest('hex')
    await userService.deleteRefreshToken(hashed_token).catch((err)=>{ res.status(400).json({error: err.message})})
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.sendStatus(204).json({})
});

// Works with database
router.post('/auth/forgot-password', checkNotAuthenticated, async (req: any, res: any) => {
    try {
        let user: User = await userService.getUserByEmail(req.body.email_address)
        if (!user) return res.status(200).json({})
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
        const userResetTokenExpiry = new Date(new Date().getTime() + 10 * 60000);

        userService.updateResetToken(user.email_address, hashedResetToken, userResetTokenExpiry);
        const resetPasswordLink = `${req.headers.origin}/reset-password/{user.reset_token}`
        await sendResetEmail({first_name: user.first_name, reset_link: resetPasswordLink, email_to: user.email_address})

        return res.status(200).json({ reset_token: resetToken, reset_token_expires: userResetTokenExpiry })
    }
    catch (err: any) {
        return res.status(400).json({ "error": err.message })
    }

});
// Works with database
router.post('/auth/reset-password/:resetToken', checkNotAuthenticated, async (req: any, res: any) => {
    try {
        const resetToken = req.params.resetToken
        // Should check if we're saving and getting an encrypted resetToken from the database for comparison
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex')
        const user: User = await userService.getUserByResetToken(hashedToken)
        const newPassword = req.body.password
        const newPasswordConfirm = req.body.password_confirm
        if (user) {
            if (user.reset_expires && user.reset_expires < new Date()) {
                res.status(401).json({ "error": "Token expired" })
            }
            await userService.updatePassword(user.id, user.email_address, newPassword, newPasswordConfirm)

            return res.status(200).send({'success': true})
        }

        return res.status(400).json({ error: 'Invalid token' })
    }
    catch (e: any) {
        return res.status(400).send(e.message)
    }
});
 

router.post('/auth/token', async (req, res) => {
    const refreshToken = req.cookies.refresh_token
    if (refreshToken == null) return res.sendStatus(403)

    const hashed_token = crypto.createHash('sha256').update(refreshToken).digest('hex')
    const token = await userService.findRefreshToken(hashed_token).catch((err)=>res.status(403).json({error: err.message}))
    res.clearCookie("access_token");
    
    if (!token) return res.sendStatus(403)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({error: err.message})
        const accessToken = generateAccessToken({ user_id: user.user_id })
        res.cookie("access_token", accessToken, {
            httpOnly: true,
            Secure: true
        })
        return res.json({ access_token: accessToken })
    })
})

function generateAccessToken(user) {
    // expiration time should be 15m in prod
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.NODE_ENV == 'development' ? '1440m' : '120m' })
}
module.exports = router