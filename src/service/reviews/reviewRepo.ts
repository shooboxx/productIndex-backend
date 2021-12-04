const Reviews = require("../../models/review");
import { Review } from "./reviewType"

const findReviewsByBusinessId = async (businessId: number) => {
    const review = await Reviews.findAll({ where: { businessid: businessId } })
    if (!review) {
        return
    }
    return review.dataValues
}

const findReviewsByUserId = async (userId: number) => {
    const reviews = await Reviews.findAll({ where: { user_id: userId }, raw: true })
    if (!reviews) {
        return
    }

    return reviews
}

const findReview = async (userId: number, businessId: number) => {
    const review = await Reviews.findOne({ where: { businessid: businessId, user_id: userId } })
    if (!review) {
        return null
    }
    return review.dataValues
}

const createReview = async (newReview: Review) => {

    await Reviews.create({
        user_id: newReview.user_id,
        businessid: newReview.business_id,
        rating_number: newReview.star_rating,
        comment: newReview.comment,
        insert_date: Date.now(),
        store_id: 1
    })
    return newReview

}

const updateReview = async (updatedReview: Review) => {
    const review = await Reviews.findByPk(updatedReview.id)
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
    const review = await Reviews.findByPk(review_id)
    if (!review) {
        return
    }
    review.destroy()
    return review

}
module.exports = { findReviewsByBusinessId, findReview, createReview, updateReview, deleteReview, findReviewsByUserId }