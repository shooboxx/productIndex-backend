import { ReviewRepo } from './reviewRepo'
import { ReviewsErrorsMessages, ReviewsTriggerMessages } from './reviewConst'
import { UserErrors } from '../user/userConst'
import { StoreErrors } from '../store/storeConst'

import { Review, ReportedReview } from './reviewType'
import { StoreService } from '../store/businessStoreService'
import AppError from '../../utils/appError'

const getReviewsByStoreId = async (storeId: number) => {
    try {
        return await ReviewRepo.findReviewsByStoreId(storeId)
    }
    catch (e : any) {
        throw new AppError(e.message, e.statusCode)
    }

}

const getUserStoreReview = async (userId: number, store_id: number) => {
    try {
        return await ReviewRepo.findUserStoreReview(userId, store_id)
    }
    catch (e : any) {
        throw new AppError(e.message, e.statusCode)
    }
}
const createReview = async (newReview: Review) => {
    try {
        _validateReview(newReview)
        const store = await StoreService.getStore(newReview.store_id, '')
        if (!store) throw new AppError(StoreErrors.StoreNotExist, 404)
        const found = await ReviewRepo.findUserStoreReview(newReview.user_id, newReview.store_id)
        if (found) throw new Error(ReviewsErrorsMessages.UserAlreadyReviewedStore)
        
        const createdReview =  await ReviewRepo.createReview(newReview)
        createdReview.deleted_date = undefined
        return createdReview
    }
    catch (e : any) {
        throw new AppError(e.message, e.statusCode)
    }
}
const updateReview = async (updatedReview: Review) => {
    try {
        _validateReview(updatedReview)
        return await ReviewRepo.updateReview(updatedReview)
    }
    catch (e : any) {
        throw new AppError(e.message, e.statusCode)
    }
}

const markReviewAsInappropriate = async (reportedReview : ReportedReview) => {
    try {   
        const review : Review = await ReviewRepo.findReviewById(reportedReview.review_id)
        if (!review) throw new AppError(ReviewsErrorsMessages.ReviewNotFound, 404)
        const userReportedReview = await ReviewRepo.findUserReportedReview(reportedReview.review_id, reportedReview.reported_by)
        if (userReportedReview) throw new AppError(ReviewsErrorsMessages.ReviewAlreadyReported)
        reportedReview.reported_reason = `${ReviewsTriggerMessages.USER_MARKED_REVIEW_INAPPROPRIATE} ${reportedReview.reported_reason}`
        return await ReviewRepo.markReviewAsInappropriate(reportedReview)
    }
    catch (e : any) {
        throw new AppError(e.message, e.statusCode)
    }

}

const deleteReview = async (userId: number, storeId: number) => {
    try {
        return await ReviewRepo.deleteReview(storeId, userId)
    }
    catch (e : any) {
        throw new AppError(e.message, e.statusCode)
    }
}

const _validateReview = (review: Review) => {
    if (review.rating_number < 1 && review.rating_number > 5) throw new AppError(ReviewsErrorsMessages.InvalidStarRating, 400);
    if (!review.rating_number) throw new AppError(ReviewsErrorsMessages.RatingRequired, 400)
    if (!review.comment) throw new AppError(ReviewsErrorsMessages.CommentRequired, 400)
    if (review.comment.length < 12) throw new AppError(ReviewsErrorsMessages.CommentLengthInvalid)
    if (!review.user_id) throw new AppError(UserErrors.UserIdRequired, 400)
    if (!review.store_id) throw new AppError(StoreErrors.StoreIdRequired, 400)
    return true
}


export const ReviewService = {
    getReviewsByStoreId,
    getUserStoreReview,
    createReview,
    updateReview,
    markReviewAsInappropriate,
    deleteReview
}
