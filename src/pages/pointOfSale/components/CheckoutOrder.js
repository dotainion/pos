import { useEffect, useRef, useState } from "react";
import { BsCashCoin } from "react-icons/bs";
import { IoCardOutline } from "react-icons/io5";
import { CardPayment } from "./CardPayment";
import { CashPayment } from "./CashPayment";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { routes } from "../../../routes/routes";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentProvider } from "../../../providers/PaymentProvider";

// Your Stripe public key
const stripePromise = loadStripe('your-stripe-publishable-key-here');

export const CheckoutOrder = () =>{
    const navigate = useNavigate();

    return (
        <PaymentProvider>
            <h2 className="text-center fw-bold my-4">Payment</h2>
            <div className="d-flex align-items-center">
               <button onClick={()=>navigate('card')} className="d-flex align-items-center btn btn-sm btn-dark me-2"><IoCardOutline className="text-primary me-2"/> Card Payment</button>
               <button onClick={()=>navigate('cash')} className="d-flex align-items-center btn btn-sm btn-dark"><BsCashCoin className="text-success me-2"/> Cash Payment</button>
            </div>
            <hr></hr>
            <Elements stripe={stripePromise}>
                <Routes>
                    <Route path={'card'} element={<CardPayment/>} />
                    <Route path={'cash'} element={<CashPayment/>} />
                    <Route path={'*'} element={<Navigate to="card" />} />
                </Routes>
            </Elements>
        </PaymentProvider>
    );
}