import AppError from '../../utils/appError.js'
import { HelpDeskRepo } from './helpDeskRepo.js'
import { HelpDeskErrors } from './helpDeskErrors.js'

const createTicket = async (userId: number, businessId: number, productId: number, message: string) => {
    userIdIsPresent(userId)
    businessIdIsPresent(businessId)
    productIdIsPresent(productId)
    messageIsPresent(message)
    return await HelpDeskRepo.createTicket(userId, businessId, productId, message)
}

const userIdIsPresent = (userId: number) => {
    if (!userId) throw new AppError(HelpDeskErrors.UserIdRequired)
}

const businessIdIsPresent = (businessId: number) => {
    if (!businessId) throw new AppError(HelpDeskErrors.BusinessIdRequired)
}

const productIdIsPresent = (productId: number) => {
    if (!productId) throw new AppError(HelpDeskErrors.ProductIdRequired)
}

const messageIsPresent = (message: string) => {
    if (!message) throw new AppError(HelpDeskErrors.MessageRequired)
}

export const HelpDeskService = {
    createTicket
}