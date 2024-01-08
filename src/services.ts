import { ITransaction, IUser } from "./structs"

const baseURL = "https://test.gefara.xyz/api/v1"

interface IUserListResponse {
    data: IUser[]
    pages: number
}

const USERS: IUser[] = []
const TRANSACTIONS: ITransaction[] = []
const now = new Date()

for (let i = 0; i < 100; i++) {
    USERS.push({
        id: `user-${i}`,
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
    })
    now.setHours(now.getHours() + 1)
    TRANSACTIONS.push({
        id: "string" + Math.random(),
        provider: "string",
        amount: parseInt((100 * Math.random()).toString()) + 50,
        currency: "string",
        meta: null,
        status: "string",
        type: "string",
        plan_id: "string",
        user_id: "string",
        referral_id: "string",
        created_at: now.toJSON(),
        external_id: "string",
    })

}

export class DS {
    public static async getUsersList(): Promise<IUserListResponse> {
        try {
            const res = await fetch(`${baseURL}/user/list`)
            if (!res.ok) {
                alert("Server https://test.gefara.xyz/api/v1 is down, dummy data will be used!")
                throw new Error("No Live Data")
            }
            return res.json()
        } catch (error) {
            return {
                data: USERS,
                pages: 1
            }
        }
    }

    public static async getUserTransactions(userID: string): Promise<ITransaction[]> {
        let transactions: ITransaction[]
        try {
            const res = await fetch(`${baseURL}/user/${userID}/transactions`)
            console.log(res)
            if (!res.ok) throw new Error("No Live Data")
            transactions =  await res.json() as never as ITransaction[]
        } catch (error) {
            transactions =  TRANSACTIONS
        }
        // transactions =  TRANSACTIONS
        // console.log(transactions);
        transactions.forEach(t => {
            t.creation = new Date(t.created_at)
        })
        return transactions
    }
}