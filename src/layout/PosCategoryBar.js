import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/routes";
import { MdFavorite } from "react-icons/md";
import { MdOutlineBeachAccess } from "react-icons/md";
import { Favorites } from "../components/Favorites";
import { usePos } from "../providers/PosProvider";
import { MdAdd } from "react-icons/md";
import $ from "jquery";

export const PosCategoryBar = () =>{
    const { addOrder, addCustomer } = usePos();

    const [active, setActive] = useState();

    const navigate = useNavigate();

    const onSelect = (cat, e) =>{
        e.stopPropagation();
        setActive(cat.title);
    }

    const newOrder = () =>{
        addOrder(null);
        addCustomer(null)
    }

    const FAVORITES = 'Favorites';
    const ACCESSORIES = 'Accessories';

    const categories = [
        {
            title: FAVORITES,
            icon: MdFavorite,
        },{
            title: ACCESSORIES,
            icon: MdOutlineBeachAccess,
        },
    ];

    useEffect(()=>{
        $(window).on('click', ()=>{
            setActive(null);
        });
    }, []);

    return(
        <div className="">
            <div className="d-flex mt-2 px-3">
                {categories.map((cat, key)=>(
                    <button 
                        onClick={(e)=>onSelect(cat, e)}
                        className={`btn w-auto rounded-0 border-0 border-bottom px-1 me-3 ${active === cat.title ? 'border-dark' : 'border-light'}`} 
                        key={key}
                    >{cat.title}<cat.icon className="ms-1"/></button>
                ))}
            </div>

            <div className="position-relative z-index-1 mb-2" onClick={(e)=>e.stopPropagation()}>
                {active === FAVORITES && <Favorites/>}
                {active === ACCESSORIES && null}
            </div>

            <div className="mt-2">
                <button onClick={()=>navigate(routes.pos().nested().discounts())} className="btn btn-sm mb-2 me-2 btn-danger">Discounts</button>
                <button onClick={()=>navigate(routes.pos().nested().customers())} className="btn btn-sm mb-2 me-2 btn-primary">Customer</button>
                <button onClick={()=>navigate(routes.pos().nested().items())} className="btn btn-sm mb-2 me-2 btn-warning">Items</button>
                <div className="d-inline-block">
                    <div className="dropdown">
                        <button className="btn btn-sm mb-2 me-2 btn-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">New Order</button>
                        <ul className="dropdown-menu">
                            <li><div className="small border-bottom text-primary p-2 pt-0">The current order will be placed on hold.</div></li>
                            <li><a onClick={()=>newOrder()} className="dropdown-item" href="#"><MdAdd className="me-2"/>New Order</a></li>
                        </ul>
                    </div>
                </div>
                <button onClick={()=>navigate(routes.order().nested().orders())} className="btn btn-sm mb-2 me-2 btn-success">Search Order</button>
            </div>
        </div>
    )
}
