import { BankOutlined } from "@ant-design/icons";
import { Avatar, Col, Row, Space, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { FC } from "react";
import "./Header.scss"

export const HeaderComponent: FC = () => {
    return (

        <Header className="header-component">
            <Content>
                <Row>
                    <Col>
                        <div>
                            BitTest
                        </div>
                    </Col>
                    <Col flex={"auto"}>
                        <div className="">
                            <BankOutlined />&nbsp;My Organization
                        </div>
                    </Col>
                    <Col className="">
                        <Space direction="horizontal" className="user-details-space">
                            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                            <Space direction="horizontal" style={{ display: "inline-block" }} >
                                <Typography className="login-status-text">Вы авторизованы</Typography>
                                <Typography className="role-text">Администратор</Typography>
                            </Space>
                        </Space>
                    </Col>
                </Row>
            </Content>
        </Header>
    )
}