export interface linkedAccount {
    type: string,
    address: string,
} 

export interface UserPayload {
    cr: string
    linked_accounts: string
    iss: string
    iat: number
    exp: number
    sub: string
    aud: string
}

export interface OrgPayload {
    cr: string
    linked_accounts: string
    iss: string
    iat: number
    exp: number
    sub: string
    aud: string
}