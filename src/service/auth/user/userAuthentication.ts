import { User } from "../../user/userType";
import {sendVerificationEmail, sendResetEmail} from '../../email/emailService'
import { UserAuthentication } from './userAuthenticationService';

export { };
const express = require('express');
const router = express.Router();
const userService = require('../../user/userService')
const { checkNotAuthenticated, authenticateToken } = require('./userAuthorization')

router.get('/auth/verify', async (req: any, res: any) => {
    try {
        const verified : User = await userService.verifyUser(req.query.token)
        if (verified) return res.status(200).json({success: true})
    }
    catch (err : any){
        return res.status(400).json({ error: err.message })
    }
    res.sendStatus(400)
})

router.post('/auth/register', checkNotAuthenticated, async (req: any, res: any) => {
    try {
        const newUser = await UserAuthentication.register(req.body)
        const verificationLink = `${req.headers.origin}/verify?token=${newUser.verify_token}`
        await sendVerificationEmail({first_name: newUser.first_name, verify_link: verificationLink, email_to: newUser.email_address})

        return res.status(200).json(newUser)
    }
    catch (err: any) {
        return res.status(400).json({ error: err.message })
    }

});

router.post('/auth/login', checkNotAuthenticated, async (req, res) => {
    try {

        const user = await UserAuthentication.login(req.body.email_address, req.body.password)
        await userService.storeRefreshToken(user.id, user.hashed_refresh_token).catch((e)=> {throw e})
        res.cookie("access_token", user.access_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        })
        res.cookie("refresh_token", user.refresh_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        })
        res.setHeader('Access-Control-Allow-Credentials', true);   
        
        return res.status(200).json({ "success" : true })
    }
    catch (e: any) {
        return res.status(e.statusCode).json({ "error": e.message })
    }
})

router.delete('/auth/logout', async (req: any, res: any) => {
    await UserAuthentication.logout(req.cookies.refresh_token)
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    return res.status(204).json({"success": true})
});

router.post('/auth/forgot-password', checkNotAuthenticated, async (req: any, res: any) => {
    try {
        const user = await UserAuthentication.forgotPasswordRequest(req.body.email_address)
        if (!user?.resetToken) return res.status(200).json({})

        const resetPasswordLink = `${req.headers.origin}/reset-password/${user.resetToken}`
        await sendResetEmail({first_name: user.firstName, reset_link: resetPasswordLink, email_to: user.emailAddress})

        return res.status(200).json({success: true})
    }
    catch (err: any) {
        return res.status(400).json({ "error": err.message })
    }

});

router.post('/auth/reset-password/:resetToken', checkNotAuthenticated, async (req: any, res: any) => {
    try {
        UserAuthentication.resetPassword(req.params.resetToken, req.body.password, req.body.password_confirm)
        return res.status(200).send({success: true})
    }
    catch (e: any) {
        return res.status(400).send(e.message)
    }
});

router.post('/auth/token', async (req, res) => {
    const refreshToken = req.cookies.refresh_token
    const accessToken = await UserAuthentication.refreshAccessToken(refreshToken)
    if (!accessToken) {
        UserAuthentication.logout(refreshToken)
        return res.sendStatus(403)
    }
    res.cookie("access_token", accessToken, {
        httpOnly: true,
        Secure: true
    })
    return res.status(204).json({ success: true })
})

router.put('/auth/password', authenticateToken, async (req, res) => {
    try {
    const currentPassword = req.body.current_password
    const newPassword = req.body.new_password
    const newPasswordConfirm = req.body.new_password_confirm
    if ((currentPassword === newPassword) || (currentPassword === newPasswordConfirm) ) return res.json({ success: true })
    
    const foundUser = await userService.getUserById(req.user_id)
    const user = await UserAuthentication.login(foundUser.email_address, currentPassword)
    await UserAuthentication.changePassword(user.id, newPassword, newPasswordConfirm)
    return res.json({ success: true })
    
}
    catch (e : any) {
        return res.status(400).send({error: e.message})
    }


})

module.exports = router