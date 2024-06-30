import { TbMenuOrder } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/routes";
import { MdCategory } from "react-icons/md";
import { FaSitemap } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { MdDiscount } from "react-icons/md";

export const InventoryLayout = ({children}) =>{
    const navigate = useNavigate();

    const navs = [
        {
            title: 'Items',
            icon: FaSitemap,
            onClick: ()=> navigate(routes.inv().products())
        },{
            title: 'Create Item',
            icon: IoIosCreate,
            onClick: ()=> navigate(routes.inv().createItem())
        },{
            title: 'Categories',
            icon: MdCategory,
            onClick: ()=> navigate(routes.inv().categories())
        },{
            title: 'Discounts',
            icon: MdDiscount,
            onClick: ()=> navigate(routes.inv().discounts())
        },
    ];
    return(
        <div className="d-flex flex-row vh-100 py-0 my-0">
            <div className="d-flex flex-column text-nowrap border-end">
                <div className="d-flex flex-column py-2">
                    {navs.map((nav, key)=>(
                        <button onClick={nav.onClick} className="d-flex align-items-center btn btn-light mx-1 rounded-0" key={key}>
                            {nav.icon && <nav.icon className="me-2"/>}
                            <span>{nav.title}</span>
                        </button>
                    ))}
                </div>
            </div>
            <div className="d-flex flex-column py-0 my-0 vh-100 min-container">{children}</div>
        </div>
    )
}