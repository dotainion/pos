import { FaEllipsis } from "react-icons/fa6";
import $ from "jquery";
import { useEffect, useRef, useState } from "react";
import { usePos } from "../../../providers/PosProvider";
import { MdDiscount } from "react-icons/md";
import { FaEllipsisV } from "react-icons/fa";
import itemImg from "../../../images/item.jpg";
import { utils } from "../../../utils/Utils";

export const Checkout = () =>{
    const { order, customer, cartItems, saveDraft, removeFromCart, setQtyCartItem } = usePos();

    const [showOption, setShowOption] = useState();
    const [total, setTotal] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [taxPercentage, setTaxPercentage] = useState(5);
    const [totalTax, setTotalTax] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);

    const onShowOption = (e) =>{
        e.stopPropagation();
        setShowOption(true);
    }

    const onHold = () =>{
        saveDraft();
    }

    const removeItem = (item) =>{
        removeFromCart(item);
    }

    useEffect(()=>{
        $(window).on('click', ()=>{
            setShowOption(false);
        });

        utils.calculate.setTaxRequirements(taxPercentage, false);
    }, []);

    useEffect(()=>{
        utils.calculate.tax(cartItems, ({totalTax, subTotal, net, totalDiscount})=>{
            setTotal(net);
            setSubTotal(subTotal);
            setTotalTax(totalTax);
            setTotalDiscount(totalDiscount);
        });
    }, [cartItems]);

    return(
        <>
            <div className="d-flex justify-content-between py-3">
                <div className="text-primary text-nowrap w-100">
                    <div className="text-truncate border-bottom mb-2 me-3">{customer?.attributes?.name}</div>
                    <div className="small text-muted lh-1"><small>Order# <a className="link-primary">{order?.attributes?.orderNumber}</a></small></div>
                    <div className="small text-muted">{cartItems.filter((p)=>p.type === 'item').length} Item</div>
                </div>
                <div>
                    <button className="btn btn-light shadow-sm"><FaEllipsis/></button>
                </div>
            </div>
            <div className="position-relative">
                {
                showOption && 
                <div className="position-absolute w-100 top-0 start-0 bg-white border shadow-sm rounded-3 p-3 z-index-1" onClick={e=>e.stopPropagation()}>
                    <button onClick={onHold} className="btn btn-sm btn-light border">Save as draft</button>
                    <div className="small"><small>Save order so you can come back to it later</small></div>
                </div>
                }
            </div>
            <div className="d-flex justify-content-between border border-bottom-0 rounded-top-3 p-3 pb-2">
                <div>In-store</div>
                <button onClick={onShowOption} className="btn btn-sm btn-light shadow-sm"><FaEllipsis/></button>
            </div>
            <div className="flex-column overflow-y-auto overflow-x-hidden border rounded-bottom-3 px-3 h-100">
                {cartItems.map((item, key)=>(
                    <div key={key}>
                        {
                            item.type === 'item'
                            ? <div className="d-flex justify-content-between my-2">
                                <div className="d-flex align-items-center w-100">
                                    <div style={{width: '40px', minWidth: '40px', height: '40px'}}>
                                        <img className="img-fluid rounded-1 w-100 h-100" src={itemImg} alt=""/>
                                    </div>
                                    <div className="bg-light rounded-end-3 text-truncate mx-2 w-75 w-sm-100 me-2" style={{maxWidth: '150px'}}>
                                        <div className="text-truncate" title={item.attributes.name}>{item.attributes.name}</div>
                                        <div className="small"><small>Natrual</small></div>
                                    </div>
                                    <div className="small">Qty</div>
                                    <input className="form-control bg-light shadow-none py-0 px-1 mx-1 no-input-appearance" onChange={(e)=>setQtyCartItem(item, e.target.value)} value={item.quantity} style={{width: '40px'}} type="number"/>
                                    <div className="me-1 text-nowrap">${item.attributes.amount}</div>
                                    <div className="dropstart">
                                        <button className="btn btn-sm btn-light p-0 pb-1" data-bs-toggle="dropdown" aria-expanded="false"><FaEllipsisV className="small"/></button>
                                        <ul className="dropdown-menu">
                                            <li><button onClick={()=>removeItem(item)} className="btn btn-sm btn-light w-100 rounded-0">Remove</button></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            : <div className="d-flex justify-content-between w-100 bg-light my-2">
                                <div className="d-flex align-items-center w-100">
                                    <div><MdDiscount className="fs-2"/></div>
                                    <div className="mx-2 w-100">
                                        <div className="text-truncate small">DISCOUNT</div>
                                        <div className="text-truncate small">{item.attributes.name}</div>
                                    </div>
                                    <div className="me-1 text-nowrap">{item.attributes.displayName}</div>
                                    <div className="dropstart">
                                        <button className="btn btn-sm btn-light p-0 pb-1" data-bs-toggle="dropdown" aria-expanded="false"><FaEllipsisV className="small"/></button>
                                        <ul className="dropdown-menu">
                                            <li><button onClick={()=>removeItem(item)} className="btn btn-sm btn-light w-100 rounded-0">Remove</button></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                ))}
                
            </div>
            <div>
                <div className="d-flex justify-content-between small mt-3">
                    <div>Tax ({taxPercentage}%):</div>
                    <div>${totalTax}</div>
                </div>
                <div className="d-flex justify-content-between small">
                    <div>Discount:</div>
                    <div>${totalDiscount}</div>
                </div>
                <div className="d-flex justify-content-between small">
                    <div>Subtotal:</div>
                    <div>${subTotal}</div>
                </div>
            </div>
            <div className="d-flex my-4 py-2">
                <button onClick={onHold} className="btn btn-sm btn-light text-primary w-50 me-1 shadow-sm">Save as draft</button>
                <button className="btn btn-sm btn-primary w-50 ms-1 shadow-sm">Charge ${total.toFixed(2)}</button>
            </div>
        </>
    )
}