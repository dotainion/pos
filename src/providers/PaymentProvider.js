import { createContext, useContext, useEffect, useRef, useState } from "react";
import { api } from "../request/Api";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { usePos } from "./PosProvider";
import { useNavigate } from "react-router-dom";
import { utils } from "../utils/Utils";

// Your Stripe public key
const stripePromise = loadStripe('your-stripe-publishable-key-here');

const Context = createContext();
export const usePayment = () => useContext(Context);

export const PaymentProvider = ({children}) =>{
    const { cartOrderLines } = usePos();

    const [change, setChange] = useState(0);
    const [total, setTotal] = useState(0);
    const [customers, setCustomers] = useState([]);
    const [limit, setLimit] = useState(100);
    const [loading, setLoading] = useState(true);
    const [tendered, setTendered] = useState(0);
    const [customer, setCustomer] = useState();

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
        console.log('changing to see change...')
        const price = parseFloat(tendered || 0) - total;
        setChange(price < 0 ? 0 : price);
    }, [tendered, total]);

    const value = {
        setTendered,
        customers,
        change,
        total,
        customer,
        setCustomer
    }

    return(
        <Context.Provider value={value}>
            <Elements stripe={stripePromise}>
                {children}
            </Elements>
        </Context.Provider>
    )
}