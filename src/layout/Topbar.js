import { MdMenu } from "react-icons/md";
import { routes } from "../routes/routes";
import { useNavigate } from "react-router-dom";
import { GoSignOut } from "react-icons/go";

export const Topbar = () =>{
    const navigate = useNavigate();


    const options = [
        {
            title: 'Sign out',
            icon: GoSignOut,
            onClick: ()=>null,
        }
    ];
    
    return(
        <div className="d-flex align-items-center border-bottom position-absolute top-0 start-0 w-100">
            <button onClick={()=>navigate(routes.nav().nested().grid())} className="btn border-0 mb-auto me-auto">
                <MdMenu className="fs-4"/>
            </button>
            <div className="dropdown">
                <button className="btn border-0 align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" width="32" height="32" className="rounded-circle"/>
                </button>
                <ul className="dropdown-menu text-small shadow-sm" hidden={!options?.length}>
                    {options?.map?.((opt, key)=>(
                        <li key={key}>
                            {
                                opt?.divider 
                                    ? <hr className="dropdown-divider"/> 
                                    : <button onClick={opt.onClick} className="d-flex align-items-center btn dropdown-item w-100">{opt?.icon ? <opt.icon className="me-2"/> : null}{opt.title}</button>
                            }
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}