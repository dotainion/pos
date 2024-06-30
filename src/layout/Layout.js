import { MdOutlineShoppingCart } from "react-icons/md";
import { TbMenuOrder } from "react-icons/tb";
import { IoReceiptOutline } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { routes } from "../routes/routes";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export const Layout = ({children}) =>{
    const navigate = useNavigate();

    const navs = [
        {
            title: 'Checkout',
            icon: MdOutlineShoppingCart,
            onClick: ()=> navigate(routes.pos().default())
        },{
            title: 'Orders',
            icon: TbMenuOrder,
            onClick: ()=> null
        },{
            title: 'Items',
            icon: IoReceiptOutline,
            onClick: ()=> navigate(routes.inv().nested().products())
        },{
            title: 'Notifications',
            icon: MdNotificationsActive,
            onClick: ()=> null
        },
    ];

    return(
        <div className="d-flex flex-column vh-100">
            <div className="d-flex flex-column-reverse flex-md-row vh-100">
                <Sidebar menu={navs} options={[]} dark />
                <div className="layout-children">{children}</div>
            </div>
        </div>
    )
}