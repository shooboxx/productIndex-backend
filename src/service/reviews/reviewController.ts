export { }

const express = require('express');
const router = express.Router()
import { ReviewService } from './reviewService';
const { authenticateToken } = require('../auth/user/userAuthorization')
import { Review, ReportedReview } from './reviewType'

router.get('/reviews', authenticateToken, async (req, res) => {
    try {
        const {storeId} = req.query
        return res.status(200).json(await ReviewService.getReviewsByStoreId(storeId))
    }
    catch (e: any) {
        res.status(200).json({ "error": e.message })
    }
})

router.get('/review', authenticateToken, async (req, res) => {
    try {
        const {storeId} = req.query
        return res.status(200).json(await ReviewService.getUserStoreReview(req.user_id, storeId))
    }
    catch (e: any) {
        res.status(200).json({ "error": e.message })
    }
})

router.post('/review', authenticateToken, async (req, res) => {
    try {
        const newReview: Review = {
            store_id: req.body.store_id,
            user_id: req.user_id,
            rating_number: req.body.rating_number,
            comment: req.body.comment
        }

        return res.status(200).json(await ReviewService.createReview(newReview))
    }
    catch (e: any) {
        res.status(200).json({ "error": e.message })
    }
})
router.post('/reviews/:reviewId', authenticateToken, async (req, res) => {
    try {
        const reviewId = parseInt(req.params.reviewId)
        const inappropriateReview : ReportedReview = {
            review_id: reviewId,
            reported_by: req.user_id,
            reported_reason: req.body.reported_reason,

        }
        return res.status(200).json(await ReviewService.markReviewAsInappropriate(inappropriateReview))
    }
    catch (e: any) {
        res.status(e.statusCode).json({ "error": e.message })
    }
})

router.put('/review', authenticateToken, async (req, res) => {
    try {
        const updatedReview: Review = {
            store_id: req.body.store_id,
            user_id: req.user_id,
            rating_number: req.body.rating_number,
            comment: req.body.review_comment
        }

        return res.status(200).json(await ReviewService.updateReview(updatedReview))
    }
    catch (e: any) {
        res.status(200).json({ "error": e.message })
    }
})

router.delete('/review', authenticateToken, async (req, res) => {
    try {
        return res.status(200).json(await ReviewService.deleteReview(req.user_id, req.body.store_id))
    }
    catch (e: any) {
        res.status(200).json({ "error": e.message })
    }
})


module.exports = router