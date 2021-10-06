export {}

const express = require('express');
const router = express.Router()

const reviewService = require('./reviewService')
import { Review } from './reviewType'


router.get('/business/:businessId/reviews', (req, res) => {
    try {
        const bizId = req.params.businessId
        return res.status(200).json(reviewService.getReviewsByBusinessId(bizId))
    }
    catch (e : any) {
        res.status(200).json({"error": e.message})
    }


})

router.post('/business/:businessId/review', (req, res) => {
    try {
        const bizId = req.params.businessId
        const newReview : Review = {
            business_id: bizId,
            user_id: req.user.id,
            star_rating: req.body.star_rating,
            review_comment: req.body.review_comment
        }
        
        return res.status(200).json(reviewService.createReview(newReview))
    }
    catch (e : any) {
        res.status(200).json({"error": e.message})
    }


})

router.put('/business/:businessId/review', (req, res) => {
    try {
        const bizId = req.params.businessId

        const updatedReview : Review = {
            business_id: bizId,
            user_id: req.user.id,
            star_rating: req.body.star_rating,
            review_comment: req.body.review_comment
        }
        
        return res.status(200).json(reviewService.updateReview(updatedReview))
    }
    catch (e : any) {
        res.status(200).json({"error": e.message})
    }
})

router.delete('/business/:businessId/review', (req, res) => {
    try {
        const bizId = req.params.businessId
        
        return res.status(200).json(reviewService.deleteReview(req.user.id, bizId))
    }
    catch (e : any) {
        res.status(200).json({"error": e.message})
    }
})




module.exports = router