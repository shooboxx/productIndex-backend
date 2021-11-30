export { }

const express = require('express');
const router = express.Router()

const reviewService = require('./reviewService')
const { authenticateToken } = require('../auth/user/userAuthorization')
import { Review } from './reviewType'


router.post('/review', authenticateToken, (req, res) => {
    try {
        const newReview: Review = {
            business_id: req.body.business_id,
            user_id: req.user_id,
            star_rating: req.body.star_rating,
            comment: req.body.review_comment
        }

        return res.status(200).json(reviewService.createReview(newReview))
    }
    catch (e: any) {
        res.status(200).json({ "error": e.message })
    }
})

router.put('/review', authenticateToken, (req, res) => {
    try {
        const updatedReview: Review = {
            business_id: req.body.business_id,
            user_id: req.user_id,
            star_rating: req.body.star_rating,
            comment: req.body.review_comment
        }

        return res.status(200).json(reviewService.updateReview(updatedReview))
    }
    catch (e: any) {
        res.status(200).json({ "error": e.message })
    }
})

router.delete('/review', authenticateToken, (req, res) => {
    try {
        return res.status(200).json(reviewService.deleteReview(req.user_id, req.body.business_id))
    }
    catch (e: any) {
        res.status(200).json({ "error": e.message })
    }
})




module.exports = router