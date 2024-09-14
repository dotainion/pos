import { FaEllipsis } from "react-icons/fa6";
import $ from "jquery";
import { useEffect, useRef, useState } from "react";
import { usePos } from "../../../providers/PosProvider";
import { MdDiscount } from "react-icons/md";
import { FaEllipsisV } from "react-icons/fa";

export const Checkout = () =>{
    const { customer, cartItems, saveDraft } = usePos();

    const [showOption, setShowOption] = useState();
    const [total, setTotal] = useState(0);

    const onShowOption = (e) =>{
        e.stopPropagation();
        setShowOption(true);
    }

    const onHold = () =>{
        saveDraft();
    }

    useEffect(()=>{
        $(window).on('click', ()=>{
            setShowOption(false);
        });
    }, []);

    useEffect(()=>{
        let subTotal = 0;
        cartItems.forEach((item)=>{
            if(item.type === 'item'){
                return subTotal += parseFloat(item.attributes.amount);
            }
            //need to be able to calculate discount here...
        });
        setTotal(subTotal);
    }, [cartItems]);

    return(
        <>
            <div className="d-flex justify-content-between py-3">
                <div className="text-primary text-nowrap">
                    <div className="text-truncate">{customer?.attributes?.firstName} {customer?.attributes?.lastName}</div>
                    <div className="small text-muted">1 Item</div>
                </div>
                <button onClick={onShowOption} className="btn btn-light shadow-sm"><FaEllipsis/></button>
            </div>
            <div className="position-relative">
                {
                showOption && 
                <div className="position-absolute w-100 top-0 start-0 bg-white border shadow-sm rounded-3 p-3 z-index-1" onClick={e=>e.stopPropagation()}>
                    <small>Temporarily save this order while you assist other customers. It will be stored with all current details and can be retrieved and completed later.</small>
                    <button onClick={onHold} className="btn btn-sm btn-light border">On hold</button>
                </div>
                }
            </div>
            <div className="d-flex justify-content-between border border-bottom-0 rounded-top-3 p-3 pb-2">
                <div>In-store</div>
                <button className="btn btn-sm btn-light shadow-sm"><FaEllipsis/></button>
            </div>
            <div className="flex-column overflow-y-auto overflow-x-hidden border rounded-bottom-3 px-3 h-100">
                {cartItems.map((item, key)=>(
                    <div key={key}>
                        {
                            item.type === 'item'
                            ? <div className="d-flex justify-content-between my-2">
                                <div className="d-flex">
                                    <div style={{width: '40px', height: '40px'}}>
                                        <img className="img-fluid rounded-1 w-100 h-100" src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""/>
                                    </div>
                                    <div className="mx-2">
                                        <div className="text-truncate">{item.attributes.name}</div>
                                        <div className="text-truncate small">Natrual</div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="me-1">${item.attributes.amount}</div>
                                    <div class="btn-group dropstart">
                                        <button className="btn btn-sm btn-light p-0 pb-1" data-bs-toggle="dropdown" aria-expanded="false"><FaEllipsisV className="small"/></button>
                                        <ul class="dropdown-menu">
                                            <button className="btn btn-sm btn-light w-100 rounded-0">Remove</button>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            : <div className="d-flex justify-content-between bg-light my-2">
                                <div className="d-flex align-items-center">
                                    <MdDiscount className="fs-2"/>
                                    <div className="mx-2">
                                        <div className="text-truncate small">DISCOUNT</div>
                                        <div className="text-truncate small">{item.attributes.name}</div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="me-1">{item.attributes.type}</div>
                                    <div class="btn-group dropstart">
                                        <button className="btn btn-sm btn-light p-0 pb-1" data-bs-toggle="dropdown" aria-expanded="false"><FaEllipsisV className="small"/></button>
                                        <ul class="dropdown-menu">
                                            <button className="btn btn-sm btn-light w-100 rounded-0">Remove</button>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                ))}
                <div className="d-flex justify-content-between my-3">
                    <div>Tax (15%)</div>
                    <div>$10.21</div>
                </div>
            </div>
            <div className="d-flex my-4 py-2">
                <button onClick={onShowOption} className="btn btn-sm btn-light text-primary w-50 me-1 shadow-sm">Save as draft</button>
                <button className="btn btn-sm btn-primary w-50 ms-1 shadow-sm">Charge ${total.toFixed(2)}</button>
            </div>
        </>
    )
}