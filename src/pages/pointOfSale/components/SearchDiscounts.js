import { Search } from "../../../widgets/Search";
import { PosCategoryBar } from "../../../layout/PosCategoryBar";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../routes/routes";
import { useEffect, useRef, useState } from "react";
import { usePos } from "../../../providers/PosProvider";
import $ from "jquery";
import { api } from "../../../request/Api";
import { Loader } from "../../../components/Loader";
import { ParseError } from "../../../utils/ParseError";

export const SearchDiscounts = () =>{
    const { addToCart } = usePos();

    const [selected, setSelected] = useState([]);
    const [discounts, setDiscounts] = useState([]);
    const [limit, setLimit] = useState(100);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState();

    const navigate = useNavigate();

    const timeoutRef = useRef();

    const onSearch = (e) =>{
        setLoading(true);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            api.discount.list({name: e.target.value}).then((response)=>{
                setDiscounts(response.data.data);
            }).catch((error)=>{
                setDiscounts([]);
                setErrors(new ParseError(error).message());
            }).finally(()=>{
                setLoading(false);
            });
        }, 500);
    }

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

    useEffect(()=>{
        api.discount.list({limit: limit}).then((response)=>{
            setDiscounts(response.data.data);
        }).catch((error)=>{

        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    return(
        <>
            <div className="mt-4">
                <Search onChange={onSearch}/>
                <PosCategoryBar/>
            </div>
            <div className="d-flex my-3">
                <button onClick={addItem} className="d-flex align-items-center btn btn-sm btn-success">Add to order <IoIosArrowForward className="ms-1"/></button>
            </div>
            {selected.length ? <div className="text-primary">{selected.length} Selected</div> : null}
            {
                loading
                ? <Loader/>
                : <div className="flex-column overflow-y-auto overflow-x-hidden">
                    {
                        discounts.length?
                        discounts.map((discount)=>(
                            <label onClick={(e)=>addDiscounts(discount, e)} className="d-flex align-items-center border-bottom pointer py-3" key={discount.id}>
                                <div className="d-flex align-items-center"><input className="round" type="checkbox"/></div>
                                <div className="px-2 w-100 text-truncate">{discount.attributes.name}</div>
                                <div className="w-25 text-truncate">{discount.attributes.displayName}</div>
                            </label>
                        )):
                        <div>No discounts</div>
                    }
                </div>
            }
        </>
    )
}