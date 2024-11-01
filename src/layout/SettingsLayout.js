import { GrMoney } from "react-icons/gr";
import { routes } from "../routes/routes";
import { useNavigate } from "react-router-dom";
import { Topbar } from "./Topbar";
import { FaSitemap } from "react-icons/fa6";

export const SettingsLayout = ({children}) =>{
    const navigate = useNavigate();

    const navs = [
        {
            title: 'Tax Settings',
            icon: GrMoney,
            onClick: ()=> navigate(routes.setting().taxSetting())
        },{
            title: 'Users',
            icon: GrMoney,
            onClick: ()=> navigate(routes.setting().users())
        },
    ];

    return(
        <div className="d-flex flex-column w-100 vh-100">
            <div className="w-100">
                <Topbar />
                <div className="layout d-flex flex-row vh-100 py-0 my-0">
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
                    <div className="d-flex flex-column py-0 my-0 w-100 vh-100 overflow-auto">{children}</div>
                </div>
            </div>
        </div>

    )
}