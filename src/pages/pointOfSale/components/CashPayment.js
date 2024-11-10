import { useEffect, useRef, useState } from "react";
import { routes } from "../../../routes/routes";
import { useNavigate } from "react-router-dom";
import { usePayment } from "../../../providers/PaymentProvider";

export const CashPayment = () =>{
    const { setTendered, customers, change, total, setCustomer } = usePayment();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const customerNameRef = useRef();
    const tenderedAmountRef = useRef({value: 0});

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        
    };

    return(
        <div className="card shadow-sm mx-auto" style={{ maxWidth: '500px' }}>
            <div className="card-body">
                <form onSubmit={handlePayment}>
                    <div className="mb-3">
                        <label htmlFor="customerName" className="form-label">Customer Name</label>
                        <div className="input-group">
                            <input ref={customerNameRef} type="text" className="form-control" id="customerName" placeholder="Enter name"/>
                            <div className="dropdown">
                                <button className="btn btn-secondary rounded-start-0 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Select Customer</button>
                                <ul className="dropdown-menu">
                                    {
                                        customers.length?
                                        customers.map((customer) => (
                                            <li key={customer.id}>
                                                <a onClick={()=>setCustomer(customer)} className="dropdown-item">{customer.attributes.name}</a>
                                            </li>
                                        )):
                                        <li className="text-nowrap px-3">No customers available</li>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tenderedAmount" className="form-label">Tendered Amount</label>
                        <input ref={tenderedAmountRef} onChange={(e)=>setTendered(e.target.value)} type="number" className="form-control" id="tenderedAmount" placeholder="Enter amount tendered" required
                        />
                    </div>

                    <h4 className="mt-4">Total Amount: <span className="text-success">${total.toFixed(2)}</span></h4>
                    <h4 className="mt-4">Change: <span className="text-danger">${change.toFixed(2)}</span></h4>

                    <div className="d-flex justify-content-between mt-4">
                        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Processing...' : 'Complete transaction'}</button>
                        <button onClick={()=>navigate(routes.pos().nested().items())} className="btn btn-dark">Cancel</button>
                    </div>
                    
                    {error && <p className="text-danger mt-3">{error}</p>}
                </form>
            </div>
        </div>
    )
}