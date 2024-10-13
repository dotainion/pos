import { usePos } from "../providers/PosProvider";

export const OrderLineAddonPicker = ({show, onClose, orderLine}) =>{
    const { setOrderLineAddonQty, addAddonToCart } = usePos();

    const handleChecked = (addon) =>{
        const foundAddon = orderLine.addons.find((on)=>on.attributes.item.attributes.itemLink.attributes.itemId === addon.attributes.itemLink.attributes.itemId);
        if(foundAddon) return true;
        return !addon.attributes.itemLink.attributes.optional || null;
    }

    const handleQuantity = (addon) =>{
        const foundAddon = orderLine.addons.find((on)=>on.attributes.item.attributes.itemLink.attributes.itemId === addon.attributes.itemLink.attributes.itemId);
        if(foundAddon) return foundAddon.attributes.quantity;
        return 1;
    }

    if(!show || !orderLine) return null;

    return(
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content modal-dialog-scrollable shadow">
                    <div className="w-100 px-3">
                        <div className="h4 mt-3">{orderLine.attributes.item.attributes.name}</div>
                        <hr></hr>
                        <div className="mb-3">
                            <button onClick={onClose} className="btn btn-sm btn-outline-primary px-4">Done</button>
                        </div>
                        <div>Quantity</div>
                        <input className="form-control mb-3" onChange={()=>{}} value={orderLine.attributes.quantity} type="number"/>
                        <div className="border border-bottom-0 rounded-3 overflow-hidden user-select-none mb-4">
                            <table className="table table-hover mb-0">
                                <tbody>
                                    {orderLine.attributes.item.attributes.bundleItems.map((addon)=>(
                                        <tr className="pointer" key={addon.id}>
                                            <td className="py-0">
                                                <label className="d-flex align-items-center pointer w-100 py-3">
                                                    <input className="round" id={orderLine.attributes.item.id} onChange={(e)=>addAddonToCart(e.target.checked, orderLine, addon)} checked={handleChecked(addon)} type="checkbox"/>
                                                    <span className="ms-2">{addon.attributes.name}</span>
                                                </label>
                                            </td>
                                            <td className="py-0" style={{width: '100px'}}>
                                                {
                                                    addon.attributes.itemLink.attributes.increaseQuantity
                                                    ? <input className="form-control w-100 my-2" onChange={(e)=>setOrderLineAddonQty(orderLine, addon, e.target.value)} type="number" min={1} defaultValue={handleQuantity(addon)}/>
                                                    : <label className="pointer w-100 py-3" htmlFor={addon.id}>1</label>
                                                }
                                                
                                            </td>
                                            <td className="py-0">
                                                <label className="py-3 w-100" htmlFor={addon.id}>
                                                    {
                                                        addon.attributes.itemLink.attributes.priceIncluded
                                                        ? <span className="text-nowrap badge bg-primary rounded-pill">Free</span>
                                                        : <span className="text-nowrap rounded-pill">${addon.attributes.itemLink.attributes.amount}</span>
                                                    }
                                                </label>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}