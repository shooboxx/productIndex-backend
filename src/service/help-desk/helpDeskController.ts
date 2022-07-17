import { HelpDeskService } from "./helpDeskService";
const express = require('express');
const router = express.Router();


router.post("/help-desk/create-ticket", async (req: any, res: any) => {
    try {
        const { userId, businessId, productId, message } = req.body
        await HelpDeskService.createTicket(userId, businessId, productId, message)
        return res.status(200).json({ message: "Ticket successfully created." })
    } catch (e: any) {
        res.status(e.statusCode || 400).json({ "error": e.message })
    }
});

module.exports = router;