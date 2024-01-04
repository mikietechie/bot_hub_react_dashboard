import { FC, useEffect, useState } from "react";
import { ITransaction, IUser } from "../structs";
import { DS } from "../services";

export const User: FC<{user: IUser}> = ({user}) => {
    const [transactions, setTransactons] = useState<ITransaction[]>([])

    useEffect(() => {
        loadTransactions()
    }, [user.id])

    const loadTransactions = async () => {
        const resData = await DS.getUserTransactions(user.id)
        setTransactons(resData)
    }

    return (
        <div className="user-component">

        </div>
    )
}