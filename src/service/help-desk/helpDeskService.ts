import AppError from '../../utils/appError'
import { HelpDeskRepo } from './helpDeskRepo'
import { HelpDeskErrors } from './helpDeskErrors'
import { ICreateHelpDeskTicket } from './helpDeskType'

const createTicket = async (ticket: ICreateHelpDeskTicket) => {
    userIdIsPresent(ticket.userId)
    subjectIsPresent(ticket.subject)
    messageIsPresent(ticket.message)
    priorityLevelIsPresent(ticket.priorityLevel)
    return await HelpDeskRepo.createTicket(ticket)
}

const getTicketById = async (ticketId: number) => {
    ticketIdIsPresent(ticketId)
    const ticket = await HelpDeskRepo.getTicketById(ticketId)
    if (!ticket) throw new AppError(HelpDeskErrors.TicketNotFound)
    return ticket
}

const userIdIsPresent = (userId: number) => {
    if (!userId) throw new AppError(HelpDeskErrors.UserIdRequired)
}

const subjectIsPresent = (subject: string) => {
    if (!subject) throw new AppError(HelpDeskErrors.SubjectRequired)
}

const priorityLevelIsPresent = (priority: string) => {
    if (!priority) throw new AppError(HelpDeskErrors.PriorityLevelRequired)
}

const messageIsPresent = (message: string) => {
    if (!message) throw new AppError(HelpDeskErrors.MessageRequired)
}

const ticketIdIsPresent = (ticketId: number) => {
    if (!ticketId) throw new AppError(HelpDeskErrors.TicketIdRequired)
}

export const HelpDeskService = {
    createTicket,
    getTicketById,
}