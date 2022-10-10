import { HelpDeskService } from "./helpDeskService";
import { ICreateHelpDeskTicket } from "./helpDeskType";
const { authenticateToken } = require('../auth/user/userAuthorization')
const express = require('express');
const router = express.Router();

router.post("/help-desk/tickets", authenticateToken, async (req: any, res: any) => {
    try {
        const ticket: ICreateHelpDeskTicket = {
            userId: req.user_id,
            subject: req.body.subject?.trim().toLowerCase(),
            message: req.body.message?.trim().toLowerCase(),
            priorityLevel: req.body.priorityLevel?.trim().toLowerCase(),
        }
        const newTicket = await HelpDeskService.createTicket(ticket)
        return res.status(200).json(newTicket)
    } catch (e: any) {
        res.status(e.statusCode || 400).json({ "error": e.message })
    }
});

router.get("/help-desk/ticket/:id", authenticateToken, async (req: any, res: any) => {
    try {
        const ticket = await HelpDeskService.getTicketById(req.params.id)
        return res.status(200).json(ticket)
    } catch (e: any) {
        res.status(e.statusCode || 400).json({ "error": e.message })
    }
});

module.exports = router;