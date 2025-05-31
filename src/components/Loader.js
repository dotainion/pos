export const Loader = ({center}) =>{
    return(
        <div className={`d-flex justify-content-center p-2 ${center ? 'align-items-center vh-100' : ''}`}>
            <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}