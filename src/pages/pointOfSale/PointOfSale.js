import { useRef } from "react";
import $ from "jquery";
import { PointOfSaleRouter } from "../../routes/PointOfSaleRouter";
import { Cart } from "./components/Cart";
import { usePos } from "../../providers/PosProvider";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";
import { api } from "../../request/Api";
import { TbShoppingCartSearch } from "react-icons/tb";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";

export const PointOfSale = () =>{
    const { lastDraftOrder, order, addOrder } = usePos();

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
            icon: TbShoppingCartSearch,
            onClick: ()=>navigate(routes.order().nested().orders()),
            descriptions: [
                'Find and review existing orders using search criteria.'
            ]
        },{
            title: 'New Order',
            icon: MdAddShoppingCart,
            onClick: ()=>addOrder(),
            descriptions: [
                'Create a new order to start a fresh transaction.'
            ]
        },
        ...(lastDraftOrder ? [{
            title: 'Last Draft Order',
            icon: MdOutlineShoppingCartCheckout,
            onClick: ()=>addOrder(lastDraftOrder),
            descriptions: [
                `${lastDraftOrder.attributes.customer?.attributes?.name || 'No customer'}`,
                `Order number: ${lastDraftOrder.attributes.orderNumber}`,
            ]
        }] : []),
    ]

    return(
        <div className="container overflow-auto vh-100">
            {
                !order
                ? <div className="mt-5">
                    <div className="mb-5 py-4 text-center w-100">
                        <div className="h4 px-4">Manage Your Orders</div>
                        <div className="px-4">Easily navigate your order management with the options below.</div>
                        <div className="px-4">Use Search Orders to find existing orders or click New Order to create a fresh order. Everything you need to streamline your ordering process is right here!</div>
                        <div className="bg-dark">
                            <hr></hr>
                            <hr></hr>
                        </div>
                    </div>
                    <div className="row w-100 p-0 m-0">
                        {options.map((option, key)=>(
                            <div className="col-12 col-sm-6 col-md-6 col-lg-4 p-1 text-center" key={key}>
                                <div onClick={option.onClick} className="card card-hover pointer overflow-hidden h-100">
                                    <div className="card-body">
                                        <p className="card-text text-primary my-4">
                                            <option.icon className="display-5"/>
                                        </p>
                                        <h5 className="card-title">{option.title}</h5>
                                        {option.descriptions.map((description, index)=>(
                                            <div className="small" key={key + index}>{description}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
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
                        <Cart/>
                    </div>
                </div>
            }
        </div>
    )
}