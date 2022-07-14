const ReviewsErrorsMessages = {
    NoBusinessReviews: 'Business has not recieved any reviews as yet.',
    ReviewNotFound: 'There are no reviews with that ID or review was not made to this store.',
    ReviewAlreadyReported: 'You have already reported this review. Please give us time to look into this matter',
    UserAlreadyReviewedStore: 'You cannot review a business more than once. Please update previous review instead',
    InvalidStarRating: 'Star rating value must be between 1 and 5',
    RatingRequired: 'Star rating is required',
    CommentRequired: 'Review comment is required',
    CommentLengthInvalid: 'Review comment must be at least 12 characters',
}

const ReviewsTriggerMessages = {
   USER_MARKED_REVIEW_INAPPROPRIATE: 'A user marked this review as inappropriate because:'
}
export {ReviewsErrorsMessages, ReviewsTriggerMessages}