import db from '../../models'

const createTicket = async (userId: number, businessId: number, productId: number, message: string) => {
    return db.HelpDesk.create({
        user_id: userId,
        business_id: businessId,
        product_id: productId,
        message: message,
        status: 'open',
    })
}

export const HelpDeskRepo = {
    createTicket
}