export interface Business {
    id: number,
    name: string,
    description: string,
    profile_pic_url?: string,
    active?: boolean,
    category: string,
    deleted_date?: Date,
    insert_date?: Date,
    update_date?: Date,
    created_by?: number,
}