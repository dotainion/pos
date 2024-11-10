import { useEffect, useState } from "react";
import { usePos } from "../providers/PosProvider";

export const ListBundleItemsToUpdate = ({show, onClose, onSelect}) =>{
    const { cartOrderLines } = usePos();

    const [orderLine, setOrderLine] = useState([]);

    useEffect(()=>{
        const items = [];
        cartOrderLines.forEach((item)=>{
            if(item.addons.length){
                items.push(item);
                items.push(item);
                items.push(item);
                items.push(item);
                items.push(item);
            }
        });
        setOrderLine(items);
    }, [cartOrderLines]);

    if(!show) return null;
    return(
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered justify-content-center" role="document">
                <div className="card shadow pe-auto z-index-2">
                    <div className="modal-body user-select-none" style={{width: '300px'}}>
                        <h4 className="modal-title">Bundle items</h4>

                        {orderLine.map((item)=>(
                            <div className="border-bottom py-2" key={item.id}>
                                <div>{item.attributes.item.attributes.name}</div>
                                <div className="small text-secondary lh-1">{item.attributes.item.attributes.category.attributes.name}</div>
                            </div>
                        ))}

                        <div className="justify-content-center px-2 pt-2">
                            <button onClick={onClose} className="btn btn-sm btn-outline-secondary">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}