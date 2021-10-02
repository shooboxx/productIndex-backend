export interface BusinessStore {
    id: number,
    businessId : number,
    uniqueName: string,
    emailAddress: string,
    phone1?: string,
    phone2?: string,
    phone3?: string,
    addressLine1: string,
    addressLine2?: string,
    country: string,
    city: string,
    postalCode: string,
    isPrimary: Boolean,
    tempOrPermClosure: string // either TEMP or PERM
    reopenDate?: number
}