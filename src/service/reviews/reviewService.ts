let reviewsRepo = require('./reviewRepo')

if (process.env.NODE_ENV == 'test') {
    reviewsRepo = require('./mockReviewRepo')
}

import { Review } from './reviewType'

const getReviewsByStoreId = async (storeId: number) => {
    try {
        const reviews = await reviewsRepo.findReviewsByStoreId(storeId)
        
        if (!reviews) throw new Error('No reviews for this business')
        return reviews
    }
    catch (e) {
        throw e
    }

}

const getUserStoreReview = async (userId: number, store_id: number) => {
    try {
        const review = await reviewsRepo.findUserStoreReview(userId, store_id)
        if (!review) throw new Error('User has not left a review for this business')
        return review
    }
    catch (e) {
        throw e
    }
}
// TODO: Update database tables and retest
const createReview = async (newReview: Review) => {
    try {
        _validateReview(newReview)
        console.log(newReview)
        const found = await reviewsRepo.findUserStoreReview(newReview.user_id, newReview.store_id)

        if (found) throw new Error('You cannot review a business more than once. Please update preview review instead')
        

        await reviewsRepo.createReview(newReview)
        return
    }
    catch (e) {
        throw e
    }
}
// #TODO: Do some testing for this to ensure all columns are being updated
const updateReview = async (updatedReview: Review) => {
    try {
        const currReview: Review = await getUserStoreReview(updatedReview.user_id, updatedReview.store_id)
        currReview.comment = updatedReview.comment || currReview.comment
        currReview.rating_number = updatedReview.rating_number || currReview.rating_number
        _validateReview(currReview)

        return await reviewsRepo.updateReview(currReview)

    }
    catch (e) {
        throw e
    }
}

// TODO: Add inappropriate reason. Track history + User that reported
const markReviewAsInappropriate = async (userId: number, storeId: number) => {
    try {
        const review: Review = await reviewsRepo.findReviewById(userId, storeId)
        review.inappropriate_flag = true
        return await reviewsRepo.updateReview(review)
    }
    catch (e) {
        throw e
    }
}

const deleteReview = async (userId: number, storeId: number) => {
    try {
        const review = await getUserStoreReview(userId, storeId)
        return await reviewsRepo.deleteReview(review.id)
    }
    catch (e) {
        throw e
    }
}

const _validateReview = (review: Review) => {
    if (review.rating_number < 1 && review.rating_number > 6) throw new Error('Star rating value must be between 1 and 5');
    if (!review.rating_number) throw new Error('Star rating is required')
    if (!review.comment) throw new Error('Review comment is required')
    if (review.comment.length < 12) throw new Error('Review comment must be at least 12 characters')
    if (!review.user_id) throw new Error('user_id is required')
    if (!review.store_id) throw new Error('store_id is required')
    return true
}

module.exports = { getReviewsByStoreId, createReview, updateReview, deleteReview,  getUserStoreReview,  markReviewAsInappropriate }