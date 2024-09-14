import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/routes";

export const PosCategoryBar = () =>{
    const [active, setActive] = useState();

    const navigate = useNavigate();

    const onSelect = (cat) =>{
        setActive(cat);
    }

    const categories = [
        {
            title: 'Favorites'
        },{
            title: 'Accessories'
        },
    ];

    return(
        <div className="">
            <div className="row my-2 px-3">
                {categories.map((cat, key)=>(
                    <button 
                        onClick={()=>onSelect(cat)} 
                        className={`btn w-auto rounded-0 border-0 border-bottom mb-2 me-3 ${active?.title === cat.title ? 'border-dark' : 'border-light'}`} 
                        key={key}
                    >{cat.title}</button>
                ))}
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