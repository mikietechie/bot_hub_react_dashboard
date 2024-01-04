import { ITransaction, IUser } from "./structs"

const baseURL = "https://test.gefara.xyz/api/v1"

interface IUserListResponse {
    data: IUser[]
    pages: number
}

export class DS {
    public static async getUsersList(): Promise<IUserListResponse> {
        const res = await fetch(`${baseURL}/user/list`)
        return res.json()  
    }

    public static async getUserTransactions(userID: string): Promise<ITransaction[]> {
        const res = await fetch(`${baseURL}/user/${userID}/transactions`)
        return res.json()
    }
}