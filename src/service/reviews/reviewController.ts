export { }

const express = require('express');
const router = express.Router()
const reviewService = require('./reviewService')
const { authenticateToken } = require('../auth/user/userAuthorization')
import { Review } from './reviewType'

//TODO:  Retest all review routes
router.get('/reviews', authenticateToken, async (req, res) => {
    try {
        const {storeId} = req.query
        return res.status(200).json(await reviewService.getReviewsByStoreId(storeId))
    }
    catch (e: any) {
        res.status(200).json({ "error": e.message })
    }
})

router.get('/review', authenticateToken, async (req, res) => {
    try {
        const {storeId} = req.query
        return res.status(200).json(await reviewService.getUserStoreReview(req.user_id, storeId))
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
            star_rating: req.body.star_rating,
            comment: req.body.review_comment
        }

        return res.status(200).json(await reviewService.createReview(newReview))
    }
    catch (e: any) {
        res.status(200).json({ "error": e.message })
    }
})

router.put('/review', authenticateToken, async (req, res) => {
    try {
        const updatedReview: Review = {
            store_id: req.body.store_id,
            user_id: req.user_id,
            star_rating: req.body.star_rating,
            comment: req.body.review_comment
        }

        return res.status(200).json(await reviewService.updateReview(updatedReview))
    }
    catch (e: any) {
        res.status(200).json({ "error": e.message })
    }
})

router.delete('/review', authenticateToken, async (req, res) => {
    try {
        return res.status(200).json(await reviewService.deleteReview(req.user_id, req.body.store_id))
    }
    catch (e: any) {
        res.status(200).json({ "error": e.message })
    }
})


module.exports = router