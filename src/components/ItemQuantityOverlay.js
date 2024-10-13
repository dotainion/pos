import itemImg from "../images/item.jpg";
import { usePos } from "../providers/PosProvider";

export const ItemQuantityOverlay = ({item, show, onClose}) =>{
    const { setOrderLineQty } = usePos();
    
    if(!show) return null;
    return(
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content shadow">
                    <div className="modal-header">
                        <h5 className="modal-title">{item.attributes.name}</h5>
                        <button onClick={onClose} type="button" className="btn-close"></button>
                    </div>
                    <div className="modal-body user-select-none">
                        <p>Price: ${item.attributes.amount}</p>
                        <img src={itemImg} alt="Sample Item" className="img-fluid" style={{width: '25%'}} />
                        <p>{item.attributes.description}</p>

                        <div className="form-group my-3">
                            <label className="pointer" htmlFor="quantity">Quantity:</label>
                            <input type="number" id="quantity" className="form-control" min={1} onChange={(e)=>setOrderLineQty(item, e.target.value)} defaultValue={item?.quantity || 0} />
                        </div>
                        <div className="form-group my-3">
                            <label className="pointer text-muted" htmlFor="discount">Discount Code:</label>
                            <input type="text" id="discount" className="form-control" disabled />
                        </div>
                        <div className="form-check my-3">
                            <input type="checkbox" className="form-check-input" id="gift" disabled />
                            <label className="form-check-label pointer" htmlFor="gift">Mark as gift</label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button onClick={onClose} type="button" className="btn btn-sm btn-secondary px-4">Done</button>
                    </div>
                </div>
            </div>
        </div>
    )
}