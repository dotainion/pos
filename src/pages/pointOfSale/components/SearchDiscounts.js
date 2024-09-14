import { IoMdAdd } from "react-icons/io";
import { Search } from "../../../widgets/Search";
import { PosCategoryBar } from "../../../layout/PosCategoryBar";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../routes/routes";
import { useState } from "react";
import { usePos } from "../../../providers/PosProvider";
import $ from "jquery";

const disc = {
    type: 'discount',
    attributes: {
        name: 'Granny disc',
        type: '5 percent'
    }
};

export const SearchDiscounts = () =>{
    const { addToCart } = usePos();

    const [selected, setSelected] = useState([]);
    const [discounts, setDiscounts] = useState([disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc,disc]);

    const navigate = useNavigate();

    const addDiscounts = (item, e) =>{
        if(!$(e.target).is('input')) return;
        if(e.target.checked){
            return setSelected((items)=>[...items, item]);
        }
        setSelected((items)=>items.filter((item)=>item.id !== item.id));
    }

    const addItem = () =>{
        selected.forEach((select)=> addToCart(select));
        navigate(routes.pos().nested().products());
    }

    return(
        <>
            <div className="mt-4">
                <Search/>
                <PosCategoryBar/>
            </div>
            <div className="d-flex my-3">
                <button className="d-flex align-items-center btn btn-sm btn-light text-primary">Add Discount <IoMdAdd className="ms-1"/></button>
                <button onClick={addItem} className="d-flex align-items-center btn btn-sm btn-success ms-2">Add Order <IoIosArrowForward className="ms-1"/></button>
            </div>
            <div className="flex-column overflow-y-auto overflow-x-hidden">
                {discounts.map((discount, key)=>(
                    <label onClick={(e)=>addDiscounts(discount, e)} className="d-flex align-items-center border-bottom pointer py-3" key={key}>
                        <div className="d-flex align-items-center"><input className="round" type="checkbox"/></div>
                        <div className="px-2 w-100 text-truncate">{discount.attributes.name}</div>
                        <div className="w-25 text-truncate">{discount.attributes.type}</div>
                    </label>
                ))}
            </div>
        </>
    )
}