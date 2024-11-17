import { useEffect, useRef, useState } from "react";
import { routes } from "../../../routes/routes";
import { useNavigate } from "react-router-dom";
import { api } from "../../../request/Api";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { usePayment } from "../../../providers/PaymentProvider";
import { usePos } from "../../../providers/PosProvider";

export const CardPayment = () => {
    const { order, customer } = usePos();
    const { setTendered, customers, change, total, setCustomer } = usePayment();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Refs for Stripe Elements
    const customerNameRef = useRef();
    const tenderedAmountRef = useRef({ value: 0 });

    // Stripe hooks
    const stripe = useStripe();
    const elements = useElements();

    // Handle the payment form submission
    const handlePayment = async (e) => {
        e.preventDefault();

        if(!order?.id) return console.log('Order not found.');

        // Check if Stripe.js has loaded and Elements are available
        if (!stripe || !elements) {
            console.error('Stripe or Elements not loaded');
            return; // Stripe or Elements not loaded
        }

        setLoading(true);
        setError(null);

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            setError('Card element not found!');
            setLoading(false);
            return;
        }

        try {
            // Call backend to create a PaymentIntent
            const response = await api.payment.createIntent({
                amount: total,
                orderId: order.id,
                userId: customer?.id,
                currency: '',
            });

            const intent = response.data.data[0]; // Get the clientSecret from the backend

            // Confirm the payment with Stripe
            const { stripError, paymentIntent } = await stripe.confirmCardPayment(intent.attributes.clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: customerNameRef.current.value, // Billing details from the form
                    },
                },
            });

            if (stripError) {
                setError(stripError.message);
                setLoading(false);
            } else if (paymentIntent.status === 'succeeded') {
                console.log('Payment successful!', paymentIntent);
                navigate(routes.pos().nested().items()); // Redirect after success
            }
        } catch (err) {
            setError('Payment failed. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="card shadow-sm mx-auto" style={{ maxWidth: "500px" }}>
            <div className="card-body">
                <form onSubmit={handlePayment}>
                    <div className="mb-3">
                        <label htmlFor="customerName" className="form-label">Customer Name</label>
                        <div className="input-group">
                            <input ref={customerNameRef} type="text" className="form-control" id="customerName" placeholder="Enter name" />
                            <div className="dropdown">
                                <button className="btn btn-secondary rounded-start-0 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Select Customer</button>
                                <ul className="dropdown-menu">
                                    {customers.length
                                    ? customers.map((customer) => (
                                        <li key={customer.id}>
                                            <a onClick={() => setCustomer(customer)} className="dropdown-item" >{customer.attributes.name}</a>
                                        </li>
                                        ))
                                    : <li className="text-nowrap px-3">No customers available</li>}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Stripe Card Element */}
                    <div className="mb-3">
                        <label className="form-label">Card Information</label>
                        <CardElement options={{
                            style: {
                                base: {
                                fontSize: "16px",
                                lineHeight: "24px",
                                color: "#32325d",
                                },
                            },
                        }} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="tenderedAmount" className="form-label">Tendered Amount</label>
                        <input ref={tenderedAmountRef} onChange={(e) => setTendered(e.target.value)} type="number" className="form-control" id="tenderedAmount" placeholder="Enter amount tendered" required />
                    </div>

                    <h4 className="mt-4">Total Amount: <span className="text-success">${total.toFixed(2)}</span></h4>
                    <h4 className="mt-4">Change: <span className="text-danger">${change.toFixed(2)}</span></h4>

                    <div className="d-flex justify-content-between mt-4">
                        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Processing..." : "Pay Now"}</button>
                        <button onClick={() => navigate(routes.pos().nested().items())} className="btn btn-dark">Cancel</button>
                    </div>

                    {error && <p className="text-danger mt-3">{error}</p>}
                </form>
            </div>
        </div>
    );
};
