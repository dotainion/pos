import { useEffect, useState } from "react";
import itemImg from "../images/item.jpg";
import { usePos } from "../providers/PosProvider";

export const AddonPicker = ({show, onClose, item}) =>{
    const { cartOrderLines, addAddonToCart } = usePos();

    const [itemWithAddon, setItemWithAddon] = useState();

    useEffect(()=>{
        if(!item) return;
        setItemWithAddon(cartOrderLines.find((cItem)=>cItem.id === item.id));
    }, [cartOrderLines, itemWithAddon]);

    if(!show) return null;

    return(
        <div className="d-block d-lg-flex w-100 px-2">
            <div className="p-1 mt-5 pt-3" style={{width: '185px', minWidth: '185px'}}>
                <div onClick={()=>null} className="card small pointer" style={{height: '150px'}}>
                    <img className="img-fluid darken-image rounded-1 w-100 h-100" src={itemImg} alt=""/>
                    <div className="position-absolute bottom-0 px-2 mb-1 text-white text-break">
                        <div>{item.attributes.name}</div>
                        <div>${item.attributes.amount}</div>
                    </div>
                </div>
                <div>Quantity</div>
                <input className="form-control" onChange={()=>{}} defaultValue={1} min={1} type="number"/>
            </div>
            <div className="w-100 ps-lg-4">
                <div className="h4 mt-3">{item.attributes.name}</div>
                <hr></hr>
                <div className="mb-3">
                    <button onClick={onClose} className="btn btn-sm btn-outline-primary px-4">Done</button>
                </div>
                <div className="border border-bottom-0 rounded-3 overflow-hidden user-select-none">
                    <table className="table table-hover mb-0">
                        <tbody>
                            {item.attributes.bundleItems.map((bundle)=>(
                                <tr className="pointer" key={bundle.id}>
                                    <td className="py-0">
                                        <label className="d-flex align-items-center pointer w-100 py-3">
                                            <input className="round" id={item.id} onChange={(e)=>addAddonToCart(e.target.checked, item, bundle)} checked={!bundle.attributes.itemLink.attributes.optional || null} type="checkbox"/>
                                            <span className="ms-2">{bundle.attributes.name}</span>
                                        </label>
                                    </td>
                                    <td className="py-0" style={{width: '100px'}}>
                                        {
                                            bundle.attributes.itemLink.attributes.increaseQuantity
                                            ? <input className="form-control w-100 my-2" type="number" min={1}/>
                                            : <label className="pointer w-100 py-3" htmlFor={bundle.id}>1</label>
                                        }
                                        
                                    </td>
                                    <td className="py-0">
                                        <label className="py-3 w-100" htmlFor={bundle.id}>
                                            {
                                                bundle.attributes.itemLink.attributes.priceIncluded
                                                ? <span className="text-nowrap badge bg-primary rounded-pill">Free</span>
                                                : <span className="text-nowrap rounded-pill">${bundle.attributes.itemLink.attributes.amount}</span>
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
    )
}