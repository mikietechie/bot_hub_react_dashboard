export interface IUser {
    id: string
    email: string
    tg_id: null | string
    name: string
    password: null | string
    avatar: null | string
    created_at: string
    role: "USER" | "ADMIN"
    subscription: {
        id: string
        plan_id: string
        user_id: string
        tokens: number
        additional_tokens: number
        created_at: string
        plan: {
            id: string
            type: "BASIC" | "PREMIUM"
            price: number
            currency: string
            tokens: number
        }
    }
}

export interface ITransaction {
    id: string
    provider: string
    amount: number
    currency: string
    meta: null
    status: string
    type: string
    plan_id: null | string
    user_id: string
    referral_id: null | string
    created_at: string
    external_id: null | string
  }
