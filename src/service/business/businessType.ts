import { BusinessRole } from "../auth/business/businessRoleType";
import { BusinessStore } from '../store/storeTypes';
import { Review } from '../reviews/reviewType';

export interface Business {
    id?: number,
    name: string,
    description?: string,
    category: string,
    profile_picture_url?: string,
    stores?: BusinessStore[],
    reviews?: Review[],
    roles?: BusinessRole[],
    active?: boolean,
    update_date?: number,
    insert_date?: number
}
