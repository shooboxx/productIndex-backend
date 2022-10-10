import db from '../../models'
import { ICreateHelpDeskTicket } from './helpDeskType'
import { TicketStatus } from './ticketStatus'

const createTicket = async (ticket: ICreateHelpDeskTicket) => {
    return db.HelpDesk.create({
        user_id: ticket.userId,
        message: ticket.message,
        subject: ticket.subject,
        status: TicketStatus.Open,
        priority_level: ticket.priorityLevel
    })
}

const getTicketById = async (ticketId: number) => {
    return db.HelpDesk.findOne({
        where: {
            id: ticketId,
        },
    })
}

export const HelpDeskRepo = {
    createTicket,
    getTicketById,
}