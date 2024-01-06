import { FC, useEffect, useState } from "react";
import { IUser } from "../structs";
import { DS } from "../services";
import { UserComponent } from "./User";

export const MainComponent: FC = () => {
    const [users, setUsers] = useState<IUser[]>([])
    const [pages, setPages] = useState<number>(0)
    const [search, setSearch] = useState<string>("")
    const [user, setUser] = useState<IUser | null>(null)

    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = async () => {
        const res = await DS.getUsersList()
        if (!res.data) return
        setUsers(res.data)
        setPages(res.pages)
    }

    return (
        <>
            <main className="row">
                <div className="col-12">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="search-prepend">
                                <i className="fa fa-search"></i>
                            </span>
                        </div>
                        <input className="form-control" placeholder="Username" type="text" onChange={(e) => setSearch(e.target.value || "")} aria-describedby="search-prepend" />
                    </div>
                </div>
                <div className="col-12 dark-bg rounded-5">
                    <table className="table table-sm table-hover">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Subscription</th>
                                <th>Token</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.filter((u) => u.name.includes(search)).map((u, index) => (
                                    <tr key={index}>
                                        <td>{u.email}</td>
                                        <td>{u.name}</td>
                                        <td>{u.role}</td>
                                        <td>{u.subscription.plan.type}</td>
                                        <td>{u.subscription.tokens}</td>
                                        <td>
                                            <span className="btn-group text-light">
                                                <button className="btn" onClick={() => setUser(u)}><i className="fa fa-edit"></i></button>
                                                <button className="btn"><i className="fa fa-trash"></i></button>
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </main>
            {
                user && <UserComponent user={user} close={() => setUser(null)} />
            }
        </>
    )
}