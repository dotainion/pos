import { IoMdSettings } from "react-icons/io";
import { Topbar } from "./Topbar";

export const Layout = ({children}) =>{
    return(
        <div className="d-flex flex-column vh-100">
            <div className="">
                <Topbar />
                <div className="layout-children">{children}</div>
            </div>
        </div>
    )
}