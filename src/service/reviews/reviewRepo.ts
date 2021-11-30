const Reviews = require("../../models/review");
import { Review } from "./reviewType"

let reviews: Review[] = [
    {
        id: 1,
        business_id: 1,
        user_id: 1000,
        star_rating: 1,
        comment: 'The food was terrible here.'
    }
]

const findReviewsByBusinessId = async (businessId: number) => {
    const review = await Reviews.findOne({ where: { businessid: businessId } })
    if (!review) {
        return
    }
    return review.dataValues
    // let bizReviews: Review[] = []
    // for (let i = 0; i < reviews.length; i++) {
    //     if (reviews[i].business_id == businessId) {
    //         bizReviews.push(reviews[i])
    //     }
    // }
    // return bizReviews
}
const findReview = async (userId: number, businessId: number) => {
    const review = await Reviews.findOne({ where: { businessid: businessId, user_id: userId } })
    if (!review) {
        return null
    }
    return review.dataValues
};

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
    review.update({ comment: updatedReview.comment })

    return updatedReview
}

const deleteReview = async (review_id: number) => {
    const review = await Reviews.findByPk(review_id)
    if (!review) {
        return
    }
        review.update({ deleted_date: Date.now()})
    return review

}
module.exports = { findReviewsByBusinessId, findReview, createReview, updateReview, deleteReview }