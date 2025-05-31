import { FaEllipsis } from "react-icons/fa6";
import $ from "jquery";
import { Fragment, useEffect, useRef, useState } from "react";
import { usePos } from "../../../providers/PosProvider";
import { MdDiscount } from "react-icons/md";
import { FaEllipsisV } from "react-icons/fa";
import itemImg from "../../../images/item.jpg";
import { utils } from "../../../utils/Utils";
import { api } from "../../../request/Api";
import { Loader } from "../../../components/Loader";
import { routes } from "../../../routes/routes";
import { useNavigate } from "react-router-dom";
import { OrderLineAddonPicker } from "../../../components/OrderLineAddonPicker";
import { BsDot } from "react-icons/bs";

export const Cart = () =>{
    const { order, customer, cartOrderLines, saveDraft, removeFromCart, setOrderLineQty, openQtyOverlay } = usePos();

    const [showOption, setShowOption] = useState();
    const [total, setTotal] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [taxPercentage, setTaxPercentage] = useState();
    const [totalTax, setTotalTax] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [orderLineToUpdate, setOrderLineToUpdate] = useState();

    const navigate = useNavigate();

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

        api.tax.list({active: true}).then((response)=>{
            if(response.data.data.length === 1){
                setTaxPercentage(response.data.data[0].attributes.value);
            }
            utils.calculate.setTaxRequirements(response.data.data);
        }).catch((error)=>{
            
        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    useEffect(()=>{
        if(loading) return;
        utils.calculate.tax(cartOrderLines, ({totalTax, subTotal, net, totalDiscount})=>{
            setTotal(net);
            setSubTotal(subTotal);
            setTotalTax(totalTax);
            setTotalDiscount(totalDiscount);
        });
    }, [cartOrderLines, taxPercentage, loading]);

    if(loading) return <Loader center/>;

    return(
        <>
            <div className="d-flex justify-content-between py-3">
                <div className="text-primary text-nowrap w-100">
                    <div className="text-truncate border-bottom mb-2 me-3">{customer?.attributes?.name}</div>
                    <div className="small text-muted lh-1"><small>Order# <a className="link-primary">{order?.attributes?.orderNumber}</a></small></div>
                    <div className="small text-muted">{cartOrderLines.length} Item</div>
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
                <table className="table">
                    <tbody>
                        {cartOrderLines.map((orderLine)=>(
                            <Fragment key={orderLine.id}>
                                {
                                    orderLine.attributes.type === 'item'
                                    ? <>
                                        <tr className="cart-tr">
                                            <td className="px-0">
                                                <div className="d-flex w-100 overflow-hidden">
                                                    <div style={{width: '40px', minWidth: '40px', height: '40px'}}>
                                                        <img className="img-fluid rounded-1 w-100 h-100" src={itemImg} alt=""/>
                                                    </div>
                                                    <div className="bg-light rounded-end-3 text-truncate mx-2 w-75 w-sm-100 me-2" style={{maxWidth: '150px'}}>
                                                        <div className="text-truncate" title={orderLine.attributes.item.attributes.name}>{orderLine.attributes.item.attributes.name}</div>
                                                        <div className="small lh-1"><small>{orderLine.attributes.item.attributes.category?.attributes?.name}</small></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <input className="form-control bg-light shadow-none py-0 px-1 mx-1 mt-3 no-input-appearance" onChange={(e)=>setOrderLineQty(orderLine, e.target.value)} value={orderLine.attributes.quantity} style={{width: '50px'}} type="number"/>
                                            </td>
                                            <td>
                                                <div className="mt-3">${orderLine.attributes.item.attributes.amount}</div>
                                            </td>
                                            <td className="px-0 text-end overlay">
                                                <div className="dropstart">
                                                    <button className="btn btn-sm btn-light p-0 pb-1" data-bs-toggle="dropdown" aria-expanded="false"><FaEllipsisV className="small"/></button>
                                                    <ul className="dropdown-menu">
                                                        <li><button onClick={()=>removeItem(orderLine)} className="btn btn-sm btn-light w-100 rounded-0">Remove</button></li>
                                                        <li><button onClick={()=>setOrderLineToUpdate(orderLine)} className="btn btn-sm btn-light w-100 rounded-0">Update item</button></li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                        {orderLine?.addons?.map?.((addon)=>(
                                            <tr className="addons" key={addon.id}>
                                                <td className="px-0" colSpan={2}>
                                                    <BsDot/>
                                                    {addon.attributes.item.attributes.name}
                                                </td>
                                                <td className="px-0">{addon.attributes.quantity}</td>
                                                <td className="px-0">
                                                    {
                                                        addon.attributes.item.attributes.itemLink.attributes.priceIncluded
                                                        ? null
                                                        : <small className="text-nowrap">${addon.attributes.item.attributes.itemLink.attributes.amount}</small>
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                    : <tr className="cart-tr">
                                        <td colSpan={2}>
                                            <div className="d-flex">
                                                <div><MdDiscount className="fs-2"/></div>
                                                <div className="mx-2 w-100">
                                                    <div className="text-truncate small">DISCOUNT</div>
                                                    <div className="text-truncate small">{orderLine.attributes.item.attributes.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{orderLine.attributes.item.attributes.displayName}</td>
                                        <td>
                                            <div className="dropstart">
                                                <button className="btn btn-sm btn-light p-0 pb-1" data-bs-toggle="dropdown" aria-expanded="false"><FaEllipsisV className="small"/></button>
                                                <ul className="dropdown-menu">
                                                    <li><button onClick={()=>removeItem(orderLine)} className="btn btn-sm btn-light w-100 rounded-0">Remove</button></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                }
                                <tr className="d-none d-md-block"><td className="border-0" colSpan={4}></td></tr>
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <div className="d-flex justify-content-between small mt-3">
                    <div>Tax {taxPercentage ? `(${taxPercentage}%)` : ''}:</div>
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
                <button onClick={()=>navigate(routes.pos().nested().checkout())} className="btn btn-sm btn-primary w-50 ms-1 shadow-sm">Charge ${total.toFixed(2)}</button>
            </div>

            {
                orderLineToUpdate !== null && 
                <OrderLineAddonPicker
                    show={orderLineToUpdate !== null}
                    onClose={()=>setOrderLineToUpdate(null)}
                    orderLine={orderLineToUpdate}
                />
            }
        </>
    )
}