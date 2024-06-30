import { FaEllipsis } from "react-icons/fa6";

export const Checkout = () =>{
    return(
        <>
            <div className="d-flex justify-content-between py-3">
                <div className="text-primary text-nowrap">
                    <div className="text-truncate">Jack Wick</div>
                    <div className="small text-muted">1 Item</div>
                </div>
                <button className="btn btn-light shadow-sm"><FaEllipsis/></button>
            </div>
            <div className="d-flex justify-content-between border border-bottom-0 rounded-top-3 p-3 pb-2">
                <div>In-store</div>
                <button className="btn btn-sm btn-light shadow-sm"><FaEllipsis/></button>
            </div>
            <div className="flex-column overflow-y-auto overflow-x-hidden border rounded-bottom-3 px-3">
                {[1,2,3,6,5,4,2,3,6,5,4,2,3,6,5,4,2,3,6,5,4,2,3,6,5,4,2,3,6,5,4,2,3,6,5,4].map((item, key)=>(
                    <div className="d-flex justify-content-between my-2" key={key}>
                        <div className="d-flex">
                            <div style={{width: '40px', height: '40px'}}>
                                <img className="img-fluid rounded-1 w-100 h-100" src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt=""/>
                            </div>
                            <div className="mx-2">
                                <div className="text-truncate">Shart Ceramic Mug</div>
                                <div className="text-truncate small">Natrual</div>
                            </div>
                        </div>
                        <div>$36.21</div>
                    </div>
                ))}
                <div className="d-flex justify-content-between my-3">
                    <div>Tax (15%)</div>
                    <div>$10.21</div>
                </div>
            </div>
            <div className="d-flex my-4 py-2">
                <button className="btn btn-sm btn-light text-primary w-50 me-1 shadow-sm">Save as draft</button>
                <button className="btn btn-sm btn-primary w-50 ms-1 shadow-sm">Charge $125.21</button>
            </div>
        </>
    )
}