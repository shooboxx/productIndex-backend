import { BusinessRole } from "../auth/business/businessRoleType";
import { BusinessStore } from '../store/storeTypes';
import { Review } from '../review/reviewType';

export interface Business {
    id: number,
    name: string,
    description?: string,
    category: string,
    profilePictureURL?: string,
    stores?: BusinessStore[],
    reviews?: Review[],
    roles?: BusinessRole[],
    active: boolean,
    updateDate?: number,
    insertDate: number
}

export interface UserRole {
    userId : number,
    role: BusinessRole
}