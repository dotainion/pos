export const OrderLineChangeOverlay = ({item, show, onClose, onCreate, onUpdate}) =>{    
    if(!show) return null;
    return(
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog modal-dialog-centered justify-content-center" role="document">
                <div className="card shadow pe-auto z-index-2">
                    <div className="modal-body user-select-none">
                        <h4 className="modal-title">{item.attributes.name}</h4>
                        <hr></hr>
                        <p className="fw-bold">Price: ${item.attributes.amount}</p>
                        <p>{item.attributes.description}</p>

                        <div className="row justify-content-center px-2">
                            <button onClick={()=>onCreate(onClose())} className="col btn btn-sm py-3 btn-outline-success">Add new item</button>
                            <button onClick={()=>onUpdate(onClose())} className="col btn btn-sm py-3 btn-outline-primary mx-2">Update existing item</button>
                            <button onClick={onClose} className="col btn btn-sm py-3 btn-outline-secondary">Cancele</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}