import { IoFlowerSharp } from "react-icons/io5";
import { MdMenu } from "react-icons/md";

export const Sidebar = ({menu, option, onClick, dark}) =>{
    return(
        <div className={`sidebar ${dark? 'text-white bg-dark': 'bg-light'}`}>
            <div className={"d-flex flex-md-column flex-shrink-0 align-items-center p-3 h-100 shadow-sm"}>
                <button onClick={onClick} className={`btn-head btn border-0 ${dark? 'bg-dark text-white': ''} d-md-flex d-none align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none`}>
                    <IoFlowerSharp className="fs-4 me-2"/>
                    <span className="fs-4 d-md-none d-lg-block">Sidebar</span>
                </button>
                <hr className="d-none d-md-block w-100"/>
                <ul className="nav nav-pills flex-md-column mb-auto">
                    {menu?.map?.((nav, key)=>(
                        <li className="nav-item" key={key}>
                            <button onClick={nav.onClick} className={`d-flex flex-row align-items-center btn w-100 text-start rounded-0 ${dark? 'btn-dark': ''}`} aria-current="page">
                                {nav.icon && <nav.icon className="me-2"/>}
                                <small className="d-md-none d-lg-block">{nav.title}</small>
                            </button>
                        </li>
                    ))}
                </ul>

                {/*<hr className="d-none d-md-block w-100"/>
                <ul className="list-unstyled flex-md-column d-none d-md-block mb-auto ps-0">
                    <li className="mb-1">
                        <button className={`d-flex d-md-block flex-column btn btn-toggle w-100 text-start ${dark? 'btn-dark': ''}`} data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">Home</button>
                        <div className="collapse show--" id="home-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li className="small"><button className={`btn btn-sm w-100 text-start small ms-3 ${dark? 'btn-dark': ''}`}>Overview</button></li>
                            </ul>
                        </div>
                    </li>
                </ul>*/}

                <hr className="d-none d-md-block w-100"/>
                <div className="dropdown">
                    <button className={`btn ${dark? 'btn-dark btn-light': ''} border-0 d-flex flex-column flex-md-row align-items-center text-decoration-none`} id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" width="32" height="32" className="rounded-circle me-2 d-none d-md-block"/>
                        <strong className={`d-none d-lg-block dropdown-toggle ${dark? 'text-light': ''}`}>POS</strong>
                        <MdMenu className="d-md-none d-block"/>
                        <small className={`d-md-none d-block ${dark? 'text-light': ''}`}>More</small>
                    </button>
                    <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2" hidden={!option?.length}>
                        {option?.map?.((opt, key)=>(
                            <li key={key}>
                                {
                                    opt.divider 
                                        ? <hr className="dropdown-divider"/> 
                                        : <button onClick={opt.onClick} className={`btn dropdown-item w-100 ${dark? 'btn-dark': ''}`}>{opt.title}</button>
                                }
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}