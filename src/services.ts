import { ITransaction, IUser } from "./structs"

const baseURL = "https://test.gefara.xyz/api/v1"

interface IUserListResponse {
    data: IUser[]
    pages: number
}

const USERS: IUser[] = Array(20).fill(
    {
        id: "string",
        email: "hey@m.com",
        tg_id: null,
        name: "Hey Dude",
        password: null,
        avatar: null,
        created_at: "string",
        role: "USER",
        subscription: {
            id: "string",
            plan_id: "string",
            user_id: "string",
            tokens: 100,
            additional_tokens: 10,
            created_at: "string",
            plan: {
                id: "string",
                type: "BASIC",
                price: 100,
                currency: "RUB",
                tokens: 500,
            }
        }
    }
)


const TRANSACTIONS: ITransaction[] = Array(10).fill(
    {
        id: "string",
        provider: "string",
        amount: 10,
        currency: "string",
        meta: null,
        status: "string",
        type: "string",
        plan_id: "string",
        user_id: "string",
        referral_id: "string",
        created_at: "string",
        external_id: "string",
    }
)

export class DS {
    public static async getUsersList(): Promise<IUserListResponse> {
        return {
            data: USERS,
            pages: 1
        }
        // const res = await fetch(`${baseURL}/user/list`)
        // return res.json()  
    }

    public static async getUserTransactions(userID: string): Promise<ITransaction[]> {
        return TRANSACTIONS
        const res = await fetch(`${baseURL}/user/${userID}/transactions`)
        return res.json()
    }
}