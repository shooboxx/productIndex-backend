const businessService = require('../business/businessService');
const userService = require('../user/userService')
let reviewsRepo = require('./reviewRepo')
const { exist } = require('../../utils/utils.js')

if (process.env.NODE_ENV == 'test') {
    reviewsRepo = require('./mockReviewRepo')
}

import { Review } from './reviewType'

const getReviewsByBusinessId = (businessId: number): Review[] => {
    try {
        const reviews = reviewsRepo.findReviewsByBusinessId(businessId)

        if (reviews.length === 0) throw new Error('No reviews for this business')
        return reviews
    }
    catch (e) {
        throw e
    }

}
const getReview = (userId: number, business_id: number): Review => {
    try {
        const review = reviewsRepo.findReview(userId, business_id)
        if (!exist(review)) throw new Error('User has not left a review for this business')
        return review
    }
    catch (e) {
        throw e
    }
}

const createReview = async (newReview: Review) => {
    try {
        // businessService.getBusinessById(newReview.business_id)
        const found = await reviewsRepo.findReview(newReview.user_id, newReview.business_id)

        if (found) throw new Error('You cannot review a business more than once. Please update preview review instead')
        _validReview(newReview)

        await reviewsRepo.createReview(newReview)
        // if (!review) throw new Error('No review found')
        return
    }
    catch (e) {
        throw e
    }
}

const updateReview = async (updatedReview: Review) => {
    try {
        // businessService.getBusinessById(updatedReview.business_id)
        const currReview: Review = getReview(updatedReview.user_id, updatedReview.business_id)
        currReview.review_comment = updatedReview.review_comment || currReview.review_comment
        currReview.star_rating = updatedReview.star_rating || currReview.star_rating
        currReview.update_date = Date.now()
        currReview.flagged = updatedReview.flagged || currReview.flagged
        currReview.inappropriate_comment = updatedReview.inappropriate_comment || currReview.inappropriate_comment
        _validReview(currReview)

        console.log(currReview)
        return await reviewsRepo.updateReview(currReview)

    }
    catch (e) {
        throw e
    }
}
const flagReview = async (userId: number, businessId: number) => {
    try {
        const review: Review = reviewsRepo.findReview(userId, businessId)
        review.flagged = true
        return await updateReview(review)
    }
    catch (e) {
        throw e
    }
}
const markReviewAsInappropriate = async (userId: number, businessId: number) => {
    try {
        const review: Review = await reviewsRepo.findReview(userId, businessId)
        review.inappropriate_comment = true
        return await updateReview(review)
    }
    catch (e) {
        throw e
    }
}

const deleteReview = async (userId: number, businessId: number) => {
    try {
        // businessService.getBusinessById(businessId)
        // userService.getUserById(userId)
        const review = await getReview(userId, businessId)
        return reviewsRepo.deleteReview(review.id)
    }
    catch (e) {
        throw e
    }
}

const getUserReviews = (userId: number) => {
    //Todo: Implement this
}

const _validReview = (review: Review) => {
    if (review.star_rating < 1 && review.star_rating > 6) throw new Error('Star rating value must be between 1 and 5');
    if (!review.star_rating) throw new Error('Star rating is required')
    if (!review.review_comment) throw new Error('Review comment is required')
    if (review.review_comment.length < 12) throw new Error('Review comment must be at least 12 characters')
    if (!review.user_id) throw new Error('user_id is required')
    return true
}
module.exports = { getReviewsByBusinessId, createReview, updateReview, deleteReview, flagReview, markReviewAsInappropriate }