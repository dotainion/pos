import { FaEllipsis } from "react-icons/fa6";
import { Search } from "../../widgets/Search";
import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../routes/routes";
import { api } from "../../request/Api";
import { ParseError } from "../../utils/ParseError";
import { Loader } from "../../components/Loader";
import { MdClose } from "react-icons/md";
import { Switch } from "../../widgets/Switch";
import { FaEllipsisV } from "react-icons/fa";
import itemImg from "../../images/item.jpg";

export const BundleItems = () =>{
    const [item, setItem] = useState();
    const [items, setItems] = useState([]);
    const [selection, setSelection] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState();
    const [limit, setLimit] = useState(100);

    const params = useParams();
    const navigate = useNavigate();

    const addonRef = useRef();

    const searchItems = (e) =>{
        setItems([]);
        api.item.list({name: e.target.value}).then((response)=>{
            setItems(response.data.data);
        }).catch((error)=>{
            setErrors(new ParseError(error).message());
        });
    }

    const getAddonPayload = () =>{
        let payload = [];
        $(addonRef.current).children().each((i, addon)=>{
            payload.push({
                itemId: $(addon).find('input[name=itemId]').val(),
                priceIncluded: $(addon).find('input[name=priceIncluded]').get(0).checked,
                price: $(addon).find('input[name=price]').val(),
                optional: $(addon).find('input[name=optionalAddon]').get(0).checked,
                taxInclusive: $(addon).find('input[name=taxInclusive]').get(0).checked,
                increaseQuantity: $(addon).find('input[name=increaseQuantity]').get(0).checked,
            });
        });
        return payload;
    }

    const onSaveBundleItems = () =>{
        setErrors(null);
        if(!item) return console.error('You are trying to edit a item but there is not item. You probably do no meant to edit.');
        const data = {
            ...item,
            ...item.attributes,
            bundleItemArray: getAddonPayload()
        }
        api.item.set(data).then((response)=>{
            
        }).catch((error)=>{
            setErrors(new ParseError(error).message());
        });
    }

    const onSelectItems = (item, checked) =>{
        if(checked) setSelection((selecteds)=>[item, ...selecteds]);
        else setSelection((selecteds)=>[...selecteds.filter((p)=>p.id !== item.id)]);
    }

    const removeFromSelection = (item, checked) =>{
        onSelectItems(item, checked);
        $(`input[data-item-id=${item.id}]`).get(0).checked = checked;
    }

    useEffect(()=>{
        let itemLoading = false;
        let itemsLoading = false;
        api.item.list({limit: limit}).then((response)=>{
            setItems(response.data.data.filter((prod)=>prod.id !== params.itemId));
        }).catch((error)=>{

        }).finally(()=>{
            itemsLoading = true;
            if(itemsLoading && itemLoading) setLoading(false);
        });

        api.item.list({id: params.itemId}).then((response)=>{
            console.log(response.data.data[0]);
            setItem(response.data.data[0]);
            setSelection(response.data.data[0].attributes.bundleItems);
        }).catch((error)=>{

        }).finally(()=>{
            itemLoading = true;
            if(itemsLoading && itemLoading) setLoading(false);
        });
    }, []);

    if(loading) return <Loader/>;

    return(
        <>
            <div className="my-3">
                <Search onChange={searchItems}/>
            </div>
            
            <div className="d-flex justify-content-end mb-3">
                <button onClick={onSaveBundleItems} type="submit" className="btn btn-sm btn-success">Save bundle items</button>
            </div>
            
            {errors ? <div className="text-danger">{errors}</div> : null}
            <div className="flex-column overflow-y-auto overflow-x-hidden">
                <div>
                    <div className="h4">{item.attributes.name}</div>
                    <div className="fw-bold small">${item.attributes.amount.toFixed(2)}</div>
                </div>
                <hr></hr>
                <div ref={addonRef} className="container row mb-3">
                    {
                        selection.map((prod, key)=>(
                            <SelectedItemRow 
                                removeFromSelection={()=>removeFromSelection(prod, false)}
                                item={prod} 
                                key={`${prod.id}${key}`}
                            />
                        ))
                    }
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className="td-m"></th>
                            <th scope="col">Item</th>
                            <th scope="col">Category</th>
                            <th scope="col">Stock on hand</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item)=>(
                            <ItemRow item={item} onSelect={onSelectItems} key={item.id}/>
                        ))}
                    </tbody>
                </table>
                {
                    items.length >= 9 &&
                    <div className="d-flex justify-content-center my-5">
                        <button onClick={onSaveBundleItems} type="submit" className="btn btn-sm btn-success">Save bundle items</button>
                    </div>
                }
            </div>
        </>
    )
}

const ItemRow = ({item, onSelect}) =>{
    const trRef = useRef();
    const checkRef = useRef();

    useEffect(()=>{
        $(trRef.current).off('click').on('click', (e)=>{
            if(e.target === checkRef.current) return;
            if(checkRef.current.checked) checkRef.current.checked = false;
            else checkRef.current.checked = true;
            onSelect?.(item, checkRef.current.checked);
        });
    }, []);

    return(
        <tr ref={trRef} className="pointer">
            <td className="td-s px-0">
                <input ref={checkRef} className="round my-2 mx-0" type="checkbox" data-item-id={item.id}/>
            </td>
            <td>
                <div className="d-flex align-items-center">
                    <div style={{width: '40px', height: '40px'}}>
                        <img className="img-fluid rounded-1 w-100 h-100" src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""/>
                    </div>
                    <div className="ps-2">{item.attributes.name}</div>
                </div>
            </td>
            <td><strong>Category:</strong>{item.attributes.category?.attributes?.name}</td>
            <td><strong>Stock on hand:</strong>{item.attributes.quantity}</td>
        </tr>
    )
}

const SelectedItemRow = ({item, removeFromSelection}) =>{
    const [priceIncluded, setPriceIncluded] = useState(null);

    const priceIncludedCondition = () =>{
        if(priceIncluded !== null) return priceIncluded;
        return item.attributes.itemLink.attributes.priceIncluded
    }

    /**
        Mandatory Item: "Make this item mandatory in the bundle."
        Discounted Price: "Apply a discounted price when added to the bundle."
        Quantity Selector: "Specify quantity for this item in the bundle."
        Display in Receipt: "Show this item on the customer receipt."
        Gift Item Option: "Mark this item as a gift."
        Expiration Date: "Set an expiration date for this item in the bundle."
        Stock Availability Check: "Check stock availability before adding."
        Custom Note: "Add a custom note for this item."
        Tax Exemption: "Mark this item as tax-exempt."
     */

    return(
        <div className="col-auto card d-inline-block position-relative border bg-light text-dark pointer m-1 p-2" style={{minWidth: '225px'}}>
            <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center w-100">
                    <div className="me-2" style={{width: '50px', height: '40px'}}>
                        <img className="img-fluid rounded-1 w-100 h-100" src={itemImg} alt=""/>
                    </div>
                    <div className="w-100">{item.attributes.name}</div>
                </div>
                <div className="dropstart">
                    <button className="btn btn-sm btn-light p-0 pb-1 ms-2" data-bs-toggle="dropdown" aria-expanded="false"><FaEllipsisV className="small"/></button>
                    <ul className="dropdown-menu">
                        <li><button onClick={removeFromSelection} className="btn btn-sm btn-light w-100 rounded-0">Remove from bundle</button></li>
                    </ul>
                </div>
            </div>
            <div className="form-check form-switch mb-2 my-2">
                <input className="form-check-input pointer" onChange={(e)=>setPriceIncluded(e.target.checked)} name="priceIncluded" type="checkbox" id={`${item.id}-price`} defaultChecked={item.attributes.itemLink.attributes.priceIncluded}/>
                <label className="form-check-label pointer w-100 me-2" htmlFor={`${item.id}-price`}>Price included</label>
                {
                    !priceIncludedCondition()
                    ? <div>
                        <input className="form-control" placeholder="Price" name="price" type="number" defaultValue={item.attributes.itemLink.attributes.amount}/>
                        <div className="small text-secondary">This item has an individual price, separate from the bundle.</div>
                    </div>
                    : <div className="small text-secondary">The price of this item will be included in the bundle price.</div>
                }
            </div>
            <div className="form-check form-switch my-2">
                <input className="form-check-input pointer" name="optionalAddon" type="checkbox" id={`${item.id}-add-on`} defaultChecked={item.attributes.itemLink.attributes.optional}/>
                <label className="form-check-label pointer w-100 me-2" htmlFor={`${item.id}-add-on`}>Optional Add-On</label>
                <div className="small text-secondary">Add this item as an optional add-on.</div>
            </div>
            <div className="form-check form-switch my-2">
                <input className="form-check-input pointer" name="increaseQuantity" type="checkbox" id={`${item.id}-quantity`} defaultChecked={item.attributes.itemLink.attributes.increaseQuantity}/>
                <label className="form-check-label pointer w-100 me-2" htmlFor={`${item.id}-quantity`}>Allow increase quantity</label>
            </div>
            <div className="form-check form-switch my-2">
                <input className="form-check-input pointer" name="taxInclusive" type="checkbox" id={`${item.id}-tax`} defaultChecked={item.attributes.itemLink.attributes.taxInclusive}/>
                <label className="form-check-label pointer w-100 me-2" htmlFor={`${item.id}-tax`}>Inclusive tax</label>
            </div>
            <input name="itemId" value={item.id} onChange={()=>{}} hidden/>
        </div>
    )
}