import { Review } from "./reviewType"
import db from "../../models";


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
        rating_number: newReview.star_rating,
        comment: newReview.comment,
        insert_date: Date.now(),
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
        inappropriate_comment: updatedReview.inappropriate_comment,
        inappropriate_flag: updatedReview.flagged,
        rating_number: updatedReview.star_rating,
        update_date: Date.now()
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
module.exports = { findReviewsByStoreId, findUserStoreReview, createReview, updateReview, deleteReview }