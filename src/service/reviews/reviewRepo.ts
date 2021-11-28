const Reviews = require("../../models/review");
import { Review } from "./reviewType"

let reviews: Review[] = [
    {
        id: 1,
        business_id: 1,
        user_id: 1000,
        star_rating: 1,
        review_comment: 'The food was terrible here.'
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

    // for (let i = 0; i < reviews.length; i++) {
    //     if (reviews[i].business_id == businessId && reviews[i].user_id == userId) {
    //         return reviews[i]
    //     }
    // }
    // return {} as Review
};

const createReview = async (newReview: Review) => {
    // const review = await Reviews.findOne({ where: { user_id: newReview.user_id } })
    // if (!review) {
    await Reviews.create({
        user_id: newReview.user_id,
        businessid: newReview.business_id,
        rating_number: newReview.star_rating,
        comment: newReview.review_comment,
        insert_date: Date.now(),
        store_id: 1
    })
    return newReview
    // }

    // newReview.id = reviews.length + 1
    // reviews.push(newReview)
    // return reviews[reviews.length - 1]
}

const updateReview = async (updatedReview: Review) => {
    const review = await Reviews.findByPk(updatedReview.id)
    if (!review) {
        return
    }
    // for (let i = 0; i < reviews.length; i++) {
    //     if (reviews[i].business_id == updatedReview.business_id && reviews[i].user_id == updatedReview.user_id) {
    //         reviews[i] = updatedReview
    //         return reviews[i]
    //     }
    // }
    return updatedReview
}

const deleteReview = async (review_id: number) => {
    const review = await Reviews.findByPk(review_id)
    if (!review) {
        return
    }

    return review.destory


    // for (let i = 0; i <= reviews.length; i++) {
    //     if (reviews[i].id == review_id) {
    //         reviews.splice(i, 1)
    //         return -1
    //     }
    // }
}
module.exports = { findReviewsByBusinessId, findReview, createReview, updateReview, deleteReview }