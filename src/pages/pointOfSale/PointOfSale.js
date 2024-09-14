import { useRef } from "react";
import $ from "jquery";
import { PointOfSaleRouter } from "../../routes/PointOfSaleRouter";
import { Checkout } from "./components/Checkout";
import { usePos } from "../../providers/PosProvider";

export const PointOfSale = () =>{
    const { lastCustomer, customer } = usePos();

    const prodsRef = useRef();
    const checkoutRef = useRef();

    const showItems = () =>{
        $(checkoutRef.current).addClass('hide-sm');
        $(prodsRef.current).hide().removeClass('hide-sm').promise().then((c)=>$(c).show('fast'));
    }

    const showCheckout = () =>{
        $(prodsRef.current).addClass('hide-sm');
        $(checkoutRef.current).hide().removeClass('hide-sm').promise().then((c)=>$(c).show('fast'));
    }

    return(
        <div className="container">
            {
                !customer
                ? <div className="d-flex align-items-center justify-content-center vh-100">
                    <div className="d-flex flex-sm-row flex-column justify-content-center">
                        <div className="row">
                            <div className="card pointer m-1" style={{width: '170px', height: '138px'}}>
                                <div className="card-body px-0">
                                    <h5 class="card-title">Search Orders</h5>
                                    <div>Find and review existing orders using search criteria.</div>
                                </div>
                            </div>
                            <div className="card pointer m-1" style={{width: '170px', height: '138px'}}>
                                <div className="card-body px-0">
                                    <h5 class="card-title">New Order</h5>
                                    <div>Create a new order to start a fresh transaction.</div>
                                </div>
                            </div>
                            <div className="card pointer m-1" style={{width: '170px', height: '138px'}}>
                                <div className="card-body px-0">
                                    <h5 class="card-title">Last Customer</h5>
                                    <div>{lastCustomer?.attributes?.firstName} {lastCustomer?.attributes?.lastName}</div>
                                    <div>Order number:</div>
                                    <div>123456789</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : <div className="d-flex">
                    <div ref={prodsRef} className="w-100 d-flex flex-column vh-100 px-2">
                        <div className="d-sm-none d-block mt-3">
                            <button className="btn btn-sm btn-secondary border shadow-sm mx-1">Search items</button>
                            <button onClick={showCheckout} className="btn btn-sm btn-light border shadow-sm mx-1">Checkout</button>
                        </div>
                        <PointOfSaleRouter/>
                    </div>
                    <div className="d-none d-sm-block px-2">
                        <div className="border-start h-100"></div>
                    </div>
                    <div ref={checkoutRef} className="d-flex flex-column vh-100 hide-sm w-sm-100 px-2" style={{width: '500px'}}>
                        <div className="d-sm-none d-block mt-3">
                            <button onClick={showItems} className="btn btn-sm btn-light border shadow-sm mx-1">Search items</button>
                            <button className="btn btn-sm btn-secondary border shadow-sm mx-1">Checkout</button>
                        </div>
                        <Checkout/>
                    </div>
                </div>
            }
        </div>
    )
}