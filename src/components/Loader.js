export const Loader = () =>{
    return(
        <div className="d-flex justify-content-center p-2">
            <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}