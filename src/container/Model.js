export const Model = ({id, children}) =>{
    return(
        <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    {/*<div className="modal-header py-2">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>*/}
                    <div className="modal-body">
                        {children}
                    </div>
                    {/*<div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>*/}
                </div>
            </div>
        </div>
    )
}

export const ModelButton = ({className, target, children}) =>{
    return(
        <button type="button" className={className} data-bs-toggle="modal" data-bs-target={`#${target}`}>
            {children}
        </button>
    )
}