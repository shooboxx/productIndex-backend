import { Review } from "./reviewType"
import db from "../../models";

// TODO: Implement this
const findReviewById = async (reviewId) => {
    return
}
const findReviewsByStoreId = async (store_id: number) => {
    const review = await db.Review.findAll({ where: { store_id: store_id } })
    if (!review) {
        return
    }
    return review.dataValues
}


const findUserStoreReview = async (userId: number, store_id: number) => {
    const review = await db.Review.findOne({ where: { store_id: store_id, user_id: userId }})
    if (!review) {
        return 
    }
    return review
}

const createReview = async (newReview: Review) => {

    const {dataValues} = await db.Review.create({
        user_id: newReview.user_id,
        store_id: newReview.store_id,
        rating_number: newReview.rating_number,
        comment: newReview.comment,
    })
    return dataValues

}

const updateReview = async (updatedReview: Review) => {
    const review = await db.Review.findByPk(updatedReview.id)
    if (!review) {
        return
    }
    review.update({
        comment: updatedReview.comment,
        flag_reason: updatedReview.flag_reason,
        inappropriate_flag: updatedReview.inappropriate_flag,
        rating_number: updatedReview.rating_number,
        deleted_date: updatedReview.deleted_date,
    })

    return updatedReview
}

const deleteReview = async (review_id: number) => {
    const review = await db.Review.findByPk(review_id)
    if (!review) {
        return
    }
    review.destroy()
    return review

}
module.exports = { findReviewsByStoreId, findUserStoreReview, createReview, updateReview, deleteReview, findReviewById }