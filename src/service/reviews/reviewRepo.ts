import { Review } from "./reviewType"
import db from "../../models";


const findReviewsByBusinessId = async (store_id: number) => {
    const review = await db.Review.findAll({ where: { store_id: store_id } })
    if (!review) {
        return
    }
    return review.dataValues
}

const findReviewsByUserId = async (userId: number) => {
    const reviews = await db.Review.findAll({ where: { user_id: userId }, raw: true })
    if (!reviews) {
        return
    }

    return reviews
}

const findReview = async (userId: number, store_id: number) => {
    const review = await db.Review.findOne({ where: { store_id: store_id, user_id: userId }})
    
    if (!review) {
        return
    }
    return review
}

const createReview = async (newReview: Review) => {

    await db.Review.create({
        user_id: newReview.user_id,
        store_id: newReview.store_id,
        rating_number: newReview.star_rating,
        comment: newReview.comment,
        insert_date: Date.now(),
    })
    return newReview

}

const updateReview = async (updatedReview: Review) => {
    const review = await db.Review.findByPk(updatedReview.id)
    if (!review) {
        return
    }
    review.update({
        comment: updatedReview.comment,
        inappropriate_comment: updatedReview.inappropriate_comment,
        inappropriate_flag: updatedReview.flagged
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
module.exports = { findReviewsByBusinessId, findReview, createReview, updateReview, deleteReview, findReviewsByUserId }