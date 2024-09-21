import { FaEllipsis } from "react-icons/fa6";
import { Search } from "../../widgets/Search";
import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../routes/routes";
import { api } from "../../request/Api";
import { ParseError } from "../../utils/ParseError";
import { Loader } from "../../components/Loader";

export const Items = () =>{
    const [item, setItem] = useState();
    const [items, setItems] = useState([]);
    const [selection, setSelection] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState();
    const [limit, setLimit] = useState(100);

    const params = useParams();
    const navigate = useNavigate();

    const onSaveBundleItems = () =>{
        if(!item) return console.error('You are trying to edit a item but there is not item. You probably do no meant to edit.');
        const data = {
            id: item.id,
            ...item.attributes,
            bundleItemIdArray: selection.map((prod)=>prod.id)
        }
        api.item.set(data).then((response)=>{
            setItem(response.data.data[0]);
            navigate(routes.inv().nested().updateItem(params.itemId));
        }).catch((error)=>{
            setErrors(new ParseError(error).message());
        });
    }

    const onSelectItems = (item, checked) =>{
        if(checked) setSelection((selecteds)=>[item, ...selecteds]);
        else setSelection((selecteds)=>[...selecteds.filter((p)=>p.id !== item.id)]);
    }

    useEffect(()=>{
        api.item.list({limit: limit}).then((response)=>{
            setItems(response.data.data);
        }).catch((error)=>{

        }).finally(()=>{
            setLoading(false);
        });

        if(!params?.itemId){
            setLoading(false);
            return;
        }

        api.item.list({id: params.itemId}).then((response)=>{
            setItem(response.data.data[0]);
        }).catch((error)=>{

        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    if(loading) return <Loader/>;

    return(
        <>
            <div className="my-3">
                <Search/>
            </div>
            {
                !!params?.itemId
                ? <div className="d-flex justify-content-end mb-3">
                    <button onClick={onSaveBundleItems} type="submit" className="btn btn-sm btn-success">Save selected bundle items</button>
                </div>
                : null
            }
            {errors ? <div className="text-danger">{errors}</div> : null}
            <div className="flex-column overflow-y-auto overflow-x-hidden">
                <table className={`table ${!!params?.itemId ? 'table-hover' : ''}`}>
                    <thead>
                        <tr>
                            {!!params?.itemId ? <th className="td-m"></th> : null}
                            <th scope="col">Item</th>
                            <th scope="col">Category</th>
                            <th scope="col">Stock on hand</th>
                            <th scope="col">Available to sell</th>
                            <th scope="col">Price</th>
                            {!params?.itemId ? <th className="td-s"></th> : null}
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, key)=>(
                            <ItemRow item={item} onSelect={onSelectItems} asSelection={!!params?.itemId} key={key}/>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

const ItemRow = ({item, asSelection, onSelect}) =>{
    const navigate = useNavigate();

    const trRef = useRef();
    const checkRef = useRef();

    useEffect(()=>{
        $(trRef.current).off('click').on('click', (e)=>{
            if(e.target === checkRef.current || !asSelection) return;
            if(checkRef.current.checked) checkRef.current.checked = false;
            else checkRef.current.checked = true;
            onSelect?.(item, checkRef.current.checked);
        });
    }, []);
    return(
        <tr ref={trRef} className={asSelection ? "pointer" : ""}>
            {
                asSelection
                ? <td className="td-s px-0">
                    <input ref={checkRef} className="round my-2 mx-0" type="checkbox" data-item-id={item.id}/>
                </td>
                : null
            }
            <td>
                <div className="d-flex">
                    <div style={{width: '40px', height: '40px'}}>
                        <img className="img-fluid rounded-1 w-100 h-100" src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""/>
                    </div>
                    <div className="mx-2">
                        <div>Shart Ceramic Mug</div>
                        <div className="small">Bundle</div>
                    </div>
                </div>
            </td>
            <td><strong>Category:</strong>Book</td>
            <td><strong>Stock on hand:</strong>15</td>
            <td><strong>Available to sell:</strong>15</td>
            <td><strong>Price:</strong>$36.21</td>
            {
                !asSelection
                ? <td className="menu top-0 end-0 td-s px-0">
                    <div className="dropstart">
                        <button className="btn btn-sm btn-light p-0 pb-1" data-bs-toggle="dropdown" aria-expanded="false"><FaEllipsis/></button>
                        <ul className="dropdown-menu">
                            <li><button onClick={()=>navigate(routes.inv().nested().updateItem(item?.id))} className="btn btn-sm btn-light w-100 rounded-0">Edit</button></li>
                        </ul>
                    </div>
                </td>
                : null
            }
        </tr>
    )
}