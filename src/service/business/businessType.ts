export interface Business {
    id: number,
    name: string,
    description?: string,
    category: string,
    profilePictureURL?: string,
    active: boolean,
    updateDate?: number,
    insertDate: number
}