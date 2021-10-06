const businessService = require('../business/businessService');
const userService = require('../user/userService')
const reviewsRepo = require('./reviewRepo')
import { Review } from './reviewType'

const getReviewsByBusinessId = (businessId : number) : Review[]=> {
    try {
        businessService.getBusinessById(businessId)
        const reviews = reviewsRepo.findReviewsByBusinessId(businessId)

        if (reviews.length === 0) throw new Error('No reviews for this business')
        return reviews
    }
    catch (e) {
        throw e
    }
    
}

const createReview = (newReview : Review) : Review=> {
    try {
        businessService.getBusinessById(newReview.business_id)
        const found = reviewsRepo.findReview(newReview.user_id, newReview.business_id)

        if (found) throw new Error('You cannot review a business more than once. Please update preview review instead')
        if (newReview.star_rating < 1 && newReview.star_rating > 6 ) throw new Error('Star rating value must be between 1 and 5');
        if (!newReview.star_rating) throw new Error('Star rating is required')
        if (!newReview.review_comment) throw new Error('Review comment is required')
        if (newReview.review_comment.length < 12) throw new Error('Review comment must be at least 12 characters')
        if (!newReview.user_id) throw new Error('user_id is required')

        const review = reviewsRepo.createReview(newReview)

        if (!review) throw new Error('No review found')
        return review
    }
    catch (e) {
        throw e
    }
}

const updateReview = (updatedReview : Review) : Review => {
    try {
        businessService.getBusinessById(updatedReview.business_id)
        const currReview : Review = reviewsRepo.findReview(updatedReview.user_id, updatedReview.business_id)

        if (updatedReview.star_rating < 1 && updatedReview.star_rating > 6 ) throw new Error('Star rating value must be between 1 and 5');
        if (!updatedReview.star_rating) throw new Error('Star rating is required')
        if (!updatedReview.review_comment) throw new Error('Review comment is required')
        if (updatedReview.review_comment.length < 12) throw new Error('Review comment must be at least 12 characters')
        if (!updatedReview.user_id) throw new Error('user_id is required')

        currReview.review_comment = updatedReview.review_comment || currReview.review_comment
        currReview.star_rating = updatedReview.star_rating || currReview.star_rating 
        currReview.update_date = Date.now()
        currReview.flagged = updatedReview.flagged || currReview.flagged
        currReview.inappropriate_comment = updatedReview.inappropriate_comment || currReview.inappropriate_comment

        return reviewsRepo.updateReview(currReview)

    }
    catch (e) {
        throw e
    }
}
const flagReview = (userId : number, businessId : number) : Review => {
    try {
        const review : Review = reviewsRepo.findReview(userId, businessId)
        review.flagged = true
        return updateReview(review)
    }
    catch (e) {
        throw e
    }
}
const markReviewAsInappropriate = (userId : number, businessId : number) : Review => {
    try {
        const review : Review = reviewsRepo.findReview(userId, businessId)
        review.inappropriate_comment = true
        return updateReview(review)
    }
    catch (e) {
        throw e
    }
}

const deleteReview = (userId : number, businessId : number) => { 
   try {
    businessService.getBusinessById(businessId)
    userService.getUserById(userId)

    const review = reviewsRepo.findReview(userId, businessId)
    reviewsRepo.deleteReview(review.id)
   }
   catch (e) {
       throw e
   }
}
module.exports = {getReviewsByBusinessId, createReview, updateReview, deleteReview, flagReview, markReviewAsInappropriate}