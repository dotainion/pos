import { useEffect, useRef, useState } from "react";
import { PosCategoryBar } from "../../../layout/PosCategoryBar"
import { Search } from "../../../widgets/Search"
import { routes } from "../../../routes/routes";
import { useNavigate } from "react-router-dom";
import { usePos } from "../../../providers/PosProvider";
import { api } from "../../../request/Api";
import { Loader } from "../../../components/Loader";
import { utils } from "../../../utils/Utils";

export const CheckoutOrder = () =>{
    const { cartOrderLines } = usePos();

    const [change, setChange] = useState(0);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [limit, setLimit] = useState(100);
    const [loading, setLoading] = useState(true);
    const [tendered, setTendered] = useState(0);

    const navigate = useNavigate();

    const cvvRef = useRef();
    const cardNumberRef = useRef();
    const expiryDateRef = useRef();
    const customerNameRef = useRef();
    const tenderedAmountRef = useRef({value: 0});

    const handlePayment = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        api.customer.list({limit: limit}).then((response)=>{
            
        }).catch((error)=>{

        }).finally(()=>{
            setIsLoading(false);
        });
    };

    const selectCustomer = (customer) =>{

    }

    useEffect(()=>{
        let taxLoading = false;
        let customerLoading = false;
        api.customer.list({limit: limit}).then((response)=>{
            setCustomers(response.data.data);
        }).catch((error)=>{

        }).finally(()=>{
            customerLoading = true;
            if(taxLoading && customerLoading) setLoading(false);
        });

        api.tax.list({active: true}).then((response)=>{
            utils.calculate.setTaxRequirements(response.data.data);
        }).catch((error)=>{
            
        }).finally(()=>{
            taxLoading = true;
            if(taxLoading && customerLoading) setLoading(false);
        });
    }, []);

    useEffect(()=>{
        if(loading) return;
        utils.calculate.tax(cartOrderLines, ({net})=>setTotal(net));
    }, [cartOrderLines, loading]);

    useEffect(()=>{
        const price = parseFloat(tenderedAmountRef.current.value || 0) - total;
        setChange(price < 0 ? 0 : price);
    }, [tendered, total]);


    if(loading) return <Loader/>

    return (
        <>
            <h2 className="text-center fw-bold my-4">Payment</h2>
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
                                                    <a onClick={()=>selectCustomer(customer)} className="dropdown-item">{customer.attributes.name}</a>
                                                </li>
                                            )):
                                            <li className="text-nowrap px-3">No customers available</li>
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cardNumber" className="form-label">Card Number</label>
                            <input ref={cardNumberRef} type="text" className="form-control" id="cardNumber" required placeholder="1234 5678 9012 3456"
                            />
                        </div>
                        <div className="row mb-3">
                            <div className="col-12 col-md-6">
                                <label htmlFor="expiryDate" className="form-label">Expiry Date (MM/YY)</label>
                                <input ref={expiryDateRef} type="text" className="form-control" id="expiryDate" required placeholder="MM/YY"/>
                            </div>
                            <div className="col-12 col-md-6">
                                <label htmlFor="cvv" className="form-label">CVV</label>
                                <input ref={cvvRef} type="text" className="form-control" id="cvv" required placeholder="123"
                                />
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
                            <button type="submit" className="btn btn-primary" disabled={isLoading}>{isLoading ? 'Processing...' : 'Pay Now'}</button>
                            <button onClick={()=>navigate(routes.pos().nested().items())} className="btn btn-dark">Cancel</button>
                        </div>
                        
                        {error && <p className="text-danger mt-3">{error}</p>}
                    </form>
                </div>
            </div>
        </>
    );
}