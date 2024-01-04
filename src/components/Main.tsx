import { FC, useEffect, useState } from "react";
import { IUser } from "../structs";
import { DS } from "../services";

export const Main: FC = () => {
    const [users, setUsers] = useState<IUser[]>([])
    const [pages, setPages] = useState<number>(0)

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = async () => {
        const res = await DS.getUsersList()
        setUsers(res.data)
        setPages(res.pages)
    }

    return (
        <main className="row">
            <div className="col-12 dark-bg rounded-5" style={{height: "250px"}}>

            </div>
        </main>
    )
}