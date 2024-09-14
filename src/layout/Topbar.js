import { IoFlowerSharp } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import { routes } from "../routes/routes";
import { useNavigate } from "react-router-dom";

export const Topbar = ({option}) =>{
    const navigate = useNavigate();

    return(
        <header className="d-flex align-items-center border-bottom position-absolute top-0 start-0 w-100">
            <button onClick={()=>navigate(routes.nav().grid())} className="btn border-0 mb-auto me-auto">
                <MdMenu className="fs-4"/>
            </button>
            <div className="dropdown">
                <button className="btn border-0 align-items-center" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" width="32" height="32" className="rounded-circle"/>
                </button>
                <ul className="dropdown-menu text-small shadow-sm" aria-labelledby="dropdownUser2" hidden={!option?.length}>
                    {option?.map?.((opt, key)=>(
                        <li key={key}>
                            {
                                opt.divider 
                                    ? <hr className="dropdown-divider"/> 
                                    : <button onClick={opt.onClick} className="btn dropdown-item w-100">{opt.title}</button>
                            }
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    )
}