import { HelpDeskService } from "./helpDeskService";
const { authenticateToken } = require('../auth/user/userAuthorization')
const express = require('express');
const router = express.Router();


router.post("/help-desk/tickets", authenticateToken, async (req: any, res: any) => {
    try {
        const { userId, businessId, productId, message } = req.body
        await HelpDeskService.createTicket(userId, businessId, productId, message)
        return res.status(200).json({ message: "Ticket successfully created." })
    } catch (e: any) {
        res.status(e.statusCode || 400).json({ "error": e.message })
    }
});

router.get("/help-desk/tickets/:id", async (req: any, res: any) => {
    try {
        const { id } = req.params
        const ticket = await HelpDeskService.getTicketById(id)
        return res.status(200).json(ticket)
    } catch (e: any) {
        res.status(e.statusCode || 400).json({ "error": e.message })
    }
});

module.exports = router;