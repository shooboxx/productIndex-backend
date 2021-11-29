export interface Review {
    id?: number,
    business_id : number,
    user_id : number,
    star_rating: number,
    review_comment: string,
    inappropriate_comment?: boolean,
    flagged?: boolean,
    update_date?: number,
    insert_date?: number
}