import { Review } from './reviewType'

let reviews : Review[] = []

const findReviewsByBusinessId = (businessId : number) : Review[]=> {
    let bizReviews : Review[] = []
    for (let i = 0; i < reviews.length; i++) {
        if (reviews[i].business_id == businessId) {
            bizReviews.push(reviews[i])
        }
    }
    return bizReviews
}

const createReview = (newReview : Review) : Review => {
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

const deleteReview = (userId : number, businessId : number) => { 
    for (let i = 0; i <= reviews.length; i++) {
        if (reviews[i].business_id == businessId && reviews[i].user_id == userId) {
            reviews.splice(i, 1)
            return -1
        }
    }
}
module.exports = {findReviewsByBusinessId, createReview, updateReview, deleteReview}