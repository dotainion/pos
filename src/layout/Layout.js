import { MdOutlineShoppingCart } from "react-icons/md";
import { TbMenuOrder } from "react-icons/tb";
import { IoReceiptOutline } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { routes } from "../routes/routes";
import { useNavigate } from "react-router-dom";
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