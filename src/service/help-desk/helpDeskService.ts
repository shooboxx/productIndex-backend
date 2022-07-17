import AppError from '../../utils/appError.js'
import { HelpDeskRepo } from './helpDeskRepo.js'

const createTicket = async (userId: number, businessId: number, productId: number, message: string) => {
    userIdIsPresent(userId)
    businessIdIsPresent(businessId)
    productIdIsPresent(productId)
    messageIsPresent(message)
    return await HelpDeskRepo.createTicket(userId, businessId, productId, message)
}

const userIdIsPresent = (userId: number) => {
    if (!userId) throw new AppError("User id is required.")
}

const businessIdIsPresent = (businessId: number) => {
    if (!businessId) throw new AppError("Business id is required.")
}

const productIdIsPresent = (productId: number) => {
    if (!productId) throw new AppError("Product id is required.")
}

const messageIsPresent = (message: string) => {
    if (!message) throw new AppError("Message is required.")
}

export const HelpDeskService = {
    createTicket
}