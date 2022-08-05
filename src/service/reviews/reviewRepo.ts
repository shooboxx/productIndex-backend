import { Review, ReportedReview } from "./reviewType"
import db from "../../models";
import { User } from '../user/userType';

const findReviewById = async (reviewId : number) : Promise<Review> => {
    return await db.Review.findOne({
        where: {
            id: reviewId,
            deleted_date: null
        },
        attributes: {
            exclude: ['deleted_date', 'user_id']
        },
        include: [{model: db.Users, attributes: ['first_name', 'last_name', 'profile_pic_url']}]
    })
}

const findReviewsByStoreId = async (storeId : number) : Promise<Review[]> => {
    return await db.Review.findAll({
        where: {
            store_id: storeId,
            deleted_date: null
        },
        attributes: {
            exclude: ['deleted_date', 'user_id']
        },
        include: [{model: db.Users, attributes: ['first_name', 'last_name', 'profile_pic_url']}]
    })
}


const findUserStoreReview = async (userId: number, storeId: number) => {
    return await db.Review.findOne({ 
        where: { 
            store_id: storeId, 
            user_id: userId, 
            deleted_date: null 
        },
        attributes: {
            exclude: ['deleted_date', 'user_id']
        },
        include: [{model: db.Users, attributes: ['first_name', 'last_name', 'profile_pic_url']}]
    }).catch(e => {throw new Error(e.message)})
}

const findUserReportedReview = async (reviewId : number, userId : number) => {
    return await db.ReportedReview.findOne({
        where: {
            review_id: reviewId,
            reported_by: userId,
        }
    })
}

const createReview = async (newReview: Review) => {
    const {dataValues} = await db.Review.create({
        user_id: newReview.user_id,
        store_id: newReview.store_id,
        rating_number: newReview.rating_number,
        comment: newReview.comment,
    }).catch(e => {throw new Error(e.message)})
    return dataValues

}

const updateReview = async (updatedReview: Review) => {
    await db.Review.update({
        comment: updatedReview.comment,
        rating_number: updatedReview.rating_number,
    }, {
        where: {
            store_id: updatedReview.store_id,
            user_id: updatedReview.user_id
        }
    }).catch(e => {throw new Error(e.message)})

    return updatedReview
}

const markReviewAsInappropriate = async (reportedReview : ReportedReview) => {
    return await db.ReportedReview.create({
        review_id: reportedReview.review_id,
        reported_by: reportedReview.reported_by,
        reported_reason: reportedReview.reported_reason

    })
}

const deleteReview = async (storeId: number, userId : number) => {
    const review = await db.Review.update({
        deleted_date: new Date()
    }, { 
        where: {
            store_id: storeId,
            user_id: userId
        } 
    })
    return review

}


export const ReviewRepo = {
    findReviewsByStoreId, 
    findUserStoreReview, 
    createReview, 
    updateReview, 
    deleteReview, 
    findReviewById,
    markReviewAsInappropriate,
    findUserReportedReview
}