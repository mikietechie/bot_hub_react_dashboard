import { FC, useEffect, useState } from "react";
import { ITransaction, IUser } from "../structs";
import { DS } from "../services";
import "./Drawer.scss"
import { Drawer, Table, Typography } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { Content } from "antd/es/layout/layout";
import { CloseOutlined } from "@ant-design/icons";
import { Area, AreaConfig } from "@ant-design/charts";
import { ColumnsType } from "antd/es/table";


const columns: ColumnsType<ITransaction> = [
    {
        title: "Tip",
        dataIndex: "tip",
        key: "id",
        render: () => <>{"Nokia"}</>
    },
    {
        title: "Amount",
        dataIndex: "Amount",
        key: "id",
        render: (_, t) => <>{t.amount}</>
    },
    {
        title: "Data",
        dataIndex: "data",
        key: "id",
        render: (_, t) => (
            <div>
                <div>{t.creation!.toJSON().slice(0,10).replaceAll('-', '.')},</div>
                <div>{t.creation!.toTimeString().slice(0,8)}</div>
            </div>
        )
    },
]

export const DrawerComponent: FC<{ user: IUser, close: VoidFunction }> = ({ user, close }) => {
    const [transactions, setTransactons] = useState<ITransaction[]>([])
    const chartConf: AreaConfig = {
        data: transactions,
        xField: "creation",
        yField: "amount",
        height: 351,
        axis: {
            x: {
                labelFill: "#fff",

            },
            y: {
                labelFill: "#fff"
            }
        },
        style: {
            fill: 'linear-gradient(180deg, #1C64F2 0%, rgba(28, 100, 242, 0.2) 100%)',
        }
    }

    useEffect(() => {
        loadTransactions()
    }, [])

    const loadTransactions = async () => {
        const resData = await DS.getUserTransactions(user.id)
        setTransactons(resData)
    }

    return (

        <Drawer title="" className="drawer-component dark-bg" placement="right" open={Boolean(user)} onClose={close}>
            <Content>
                <Paragraph className="tp6002026 white-fg">{user.email}&nbsp;<CloseOutlined onClick={close} style={{ "float": "right" }} /></Paragraph>
                <Paragraph className="tp6002026 white-fg">{user.name}</Paragraph>

                {
                    transactions.length &&
                    <Area {...chartConf} />
                }

                <Typography className="tp6002026 white-fg" style={{paddingBottom: "16px"}}>История операций</Typography>
                <Table columns={columns} dataSource={transactions} />
            </Content>
        </Drawer>
    )
}
