import { FC, useEffect, useState } from "react";
import { IUser } from "../structs";
import { DS } from "../services";
import { DrawerComponent } from "./Drawer";
import { Button, Col, Divider, Flex, Form, Input, Row, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import Table, { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import "./Main.scss"


interface IUserTable {
    id: string
    email: string
    name: string
    role: string
    subsription: string
    token: string
    action: unknown
}

export const MainComponent: FC = () => {
    const [users, setUsers] = useState<IUser[]>([])
    const [, setPages] = useState<number>(0)
    const [search, setSearch] = useState<string>("")
    const [user, setUser] = useState<IUser | null>(null)
    const dataSource: IUserTable[] = users.filter(u => JSON.stringify(u).includes(search)).map((u) => Object.assign({
        id: u.id,
        email: u.email,
        name: u.name,
        role: u.role,
        subsription: u.subscription.plan.type,
        token: u.subscription.tokens,
        action: "unknown"
    }))
    const columns: ColumnsType<IUserTable> = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'id',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'id',
        },
        {
            title: 'Subsription',
            dataIndex: 'subsription',
            key: 'id',
        },
        {
            title: 'Token',
            dataIndex: 'token',
            key: 'id',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'id',
            render: (_, u) => (
                <Flex wrap="wrap" gap="small">
                    <Button type="text" icon={<EditOutlined className="active-fg" />} onClick={() => setUser(u as never as IUser)}></Button>
                    <Button type="text" icon={<DeleteOutlined className="active-fg" />}></Button>
                </Flex>
            )
        },
    ]

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
            <Content className="main-component">
                <Row gutter={16}>
                    <Col span={24} style={{marginBottom: "16px"}}>
                        <Typography style={{fontWeight: 600, lineHeight: "26px", fontSize: "20px"}}>Моя организация</Typography>
                        <Divider ></Divider>
                        <Typography style={{fontWeight: 600, lineHeight: "26px", fontSize: "20px"}}>Пользователи</Typography>
                    </Col>
                    <Col span={24} style={{}}>
                        <Form.Item>
                            <Input className="search-input" prefix={<SearchOutlined />} placeholder="Search" onChange={(e) => setSearch(e.target.value || "")} />
                        </Form.Item>
                    </Col>
                    <Col span={24} style={{}}>
                        <Table className="users-table" columns={columns} dataSource={dataSource} />
                    </Col>
                </Row>
            </Content>
            {
                user && <DrawerComponent user={user} close={() => setUser(null)} />
            }
        </>
    )
}