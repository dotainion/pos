import { useRef } from "react";
import $ from "jquery";
import { PointOfSaleRouter } from "../../routes/PointOfSaleRouter";
import { Checkout } from "./components/Checkout";
import { usePos } from "../../providers/PosProvider";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";

export const PointOfSale = () =>{
    const { lastCustomer, order, addOrder } = usePos();

    const navigate = useNavigate();

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

    const options = [
        {
            title: 'Search Orders',
            onClick: ()=>navigate(routes.order().nested().orders()),
            descriptions: [
                'Find and review existing orders using search criteria.'
            ]
        },{
            title: 'New Order',
            onClick: ()=>addOrder(),
            descriptions: [
                'Create a new order to start a fresh transaction.'
            ]
        },
        ...(lastCustomer ? [{
            title: 'Last Customer',
            onClick: ()=>addOrder(lastCustomer),
            descriptions: [
                `${lastCustomer?.attributes?.firstName} ${lastCustomer?.attributes?.lastName}`,
                'Order number:',
                `${'123456789'}`,
            ]
        }] : []),
    ]

    return(
        <div className="container">
            {
                !order
                ? <div className="d-flex align-items-center justify-content-center vh-100">
                    <div className="d-flex flex-sm-row flex-column justify-content-center">
                        <div className="row justify-content-center px-2">
                            {options.map((option, key)=>(
                                <div className="col-12 col-sm-6 col-md-6 col-lg-4 p-1" key={key}>
                                    <div onClick={option.onClick} className="card pointer h-100">
                                        <div className="card-body">
                                            <h5 className="card-title">{option.title}</h5>
                                            {option.descriptions.map((description, index)=>(
                                                <div key={key + index}>{description}</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
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