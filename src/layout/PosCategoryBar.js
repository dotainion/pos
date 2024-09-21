import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/routes";
import { MdFavorite } from "react-icons/md";
import { MdOutlineBeachAccess } from "react-icons/md";
import $ from "jquery";
import { Favorites } from "../components/Favorites";

const prod = {
    id: 'prod',
    type: 'item',
    attributes: {
        name: 'Fish',
        amount: '251'
    }
};

export const PosCategoryBar = () =>{
    const [active, setActive] = useState();

    const navigate = useNavigate();

    const onSelect = (cat, e) =>{
        e.stopPropagation();
        setActive(cat.title);
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
                <button onClick={()=>navigate(routes.pos().nested().products())} className="btn btn-sm mb-2 me-2 btn-warning">Items</button>
                <button onClick={()=>navigate(routes.order().nested().orders())} className="btn btn-sm mb-2 me-2 btn-success">Search Carts</button>
            </div>
        </div>
    )
}
