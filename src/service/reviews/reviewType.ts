export interface Review {
    id?: number,
    store_id: number,
    user_id: number,
    star_rating: number,
    comment: string,
    inappropriate_comment?: boolean,
    flagged?: boolean,
    update_date?: number,
    insert_date?: number
}