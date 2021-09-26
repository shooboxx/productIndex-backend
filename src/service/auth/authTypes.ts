export interface Role {
    id: number,
    roleName: string,
    accessLevel: number,
    updateDate: number,
    insertDate: number
}

// ROLES {
// 0: Unlimited, 1: Admin, 2: Moderator, 3: Tester, 4: Beta User, 5: User, 6: Anonymous
// }