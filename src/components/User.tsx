import { FC, useEffect, useState } from "react";
import { ITransaction, IUser } from "../structs";
import { DS } from "../services";
import "./User.scss"

export const UserComponent: FC<{user: IUser, close: VoidFunction}> = ({user, close}) => {
    const [transactions, setTransactons] = useState<ITransaction[]>([])

    useEffect(() => {
        loadTransactions()
    }, [user])

    const loadTransactions = async () => {
        const resData = await DS.getUserTransactions(user.id)
        setTransactons(resData)
    }

    return (
        <div className="user-component p-5">
            <p>
                {user.email}&nbsp;<i className="fa fa-x float-end" onClick={close}></i>
            </p>
            <p>
                {user.name}
            </p>

            <div className="table-table-responsive">
                <table className="table">
                <caption>History of operations</caption>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transactions.map((t, index) => (
                                <tr key={index}>
                                    <td>{t.type}</td>
                                    <td>{t.amount}</td>
                                    <td>{t.created_at}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
