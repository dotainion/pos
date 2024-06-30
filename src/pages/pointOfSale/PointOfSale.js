import { useRef } from "react";
import $ from "jquery";
import { PointOfSaleRouter } from "../../routes/PointOfSaleRouter";
import { Checkout } from "./components/Checkout";

export const PointOfSale = () =>{
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
            <div className="d-flex">
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
        </div>
    )
}