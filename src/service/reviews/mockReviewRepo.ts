import { Review } from './reviewType'

let reviews : Review[] = [
    {
        id: 1,
        business_id: 1,
        user_id: 1000,
        star_rating: 1,
        review_comment: 'The food was terrible here.'
    }
]

const findReviewsByBusinessId = (businessId : number) : Review[]=> {
    let bizReviews : Review[] = []
    for (let i = 0; i < reviews.length; i++) {
        if (reviews[i].business_id == businessId) {
            bizReviews.push(reviews[i])
        }
    }
    return bizReviews
}
const findReview = (userId: number, businessId : number) : Review => {
    for (let i = 0; i < reviews.length; i++) {
        if (reviews[i].business_id == businessId && reviews[i].user_id == userId) {
            return reviews[i]
        }
    }
    return {} as Review
}

const createReview = (newReview : Review) : Review => {
    newReview.id = reviews.length + 1
    reviews.push(newReview)
    return reviews[reviews.length-1]
}

const updateReview = (updatedReview : Review) : Review => {
    for (let i = 0; i < reviews.length; i++) {
        if (reviews[i].business_id == updatedReview.business_id && reviews[i].user_id == updatedReview.user_id) {
            reviews[i] = updatedReview
            return reviews[i]
        }
    }
    return updatedReview
}

const deleteReview = (review_id : number) => { 
    for (let i = 0; i <= reviews.length; i++) {
        if (reviews[i].id == review_id) {
            reviews.splice(i, 1)
            return -1
        }
    }
}
module.exports = {findReviewsByBusinessId, findReview, createReview, updateReview, deleteReview}