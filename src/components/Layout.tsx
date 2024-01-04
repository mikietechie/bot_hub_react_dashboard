import { FC } from "react";
import { Header } from "./Header";
import { Main } from "./Main";

export const Layout: FC = () => {

    return (
        <div className="container py-3">
            <Header />
            <Main />
        </div>
    )
}
