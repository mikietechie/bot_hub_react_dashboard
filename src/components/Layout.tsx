import { FC } from "react";
import { HeaderComponent } from "./Header";
import { MainComponent } from "./Main";

export const LayoutComponent: FC = () => {

    return (
        <div className="container py-5">
            <HeaderComponent />
            <MainComponent />
        </div>
    )
}
