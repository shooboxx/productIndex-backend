import { BusinessRole } from "../auth/business/businessRoleType";
import { BusinessStore } from '../store/storeTypes';
import { Review } from '../reviews/reviewType';
import {BusinessItem} from '../inventory/businessInventoryType'

export interface Business {
    id?: number,
    name: string,
    description?: string,
    category: string,
    profile_picture_url?: string,
    stores?: BusinessStore[],
    reviews?: Review[],
    roles?: BusinessRole[],
    items?: BusinessItem[],
    active?: boolean,
    created_by: number,
    update_date?: number,
    insert_date?: number
}
