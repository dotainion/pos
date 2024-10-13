import { FaEllipsis } from "react-icons/fa6";
import { Search } from "../../widgets/Search";
import { AiOutlineBorderlessTable } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";
import { useEffect, useState } from "react";
import { api } from "../../request/Api";
import { Loader } from "../../components/Loader";
import { usePos } from "../../providers/PosProvider";
import { FaEllipsisV } from "react-icons/fa";
import { utils } from "../../utils/Utils";

export const Orders = () =>{
    const { addOrder } = usePos();

    const [orders, setOrders] = useState([]);
    const [limit, setLimit] = useState(100);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const selectOrder = (order) =>{
        addOrder(order);
        navigate(routes.pos().nested().items());
    }

    useEffect(()=>{
        api.order.list({limit: limit}).then((response)=>{
            setOrders(response.data.data);
        }).catch((error)=>{

        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    if(loading) return <Loader/>;
    
    return(
        <div className="container">
            <div className="my-3">
                <Search/>
            </div>
            <div className="flex-column overflow-y-auto overflow-x-hidden">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Order #</th>
                            <th>Date</th>
                            <th>Customer</th>
                            <th>Total Discount</th>
                            <th>Tax</th>
                            <th>Total</th>
                            <th>Net</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order)=>(
                            <tr className="align-items-center pointer" key={order.id}>
                                {/**when click on the tr go to another page that have the order and its status and list its items and discounts on a single screen */}
                                <td>
                                    <div className="d-flex align-items-center">
                                        <AiOutlineBorderlessTable/>
                                        <span className="ms-1" title={order.id}>{order.attributes.orderNumber}</span>
                                    </div>
                                </td>
                                <td>{utils.date.toLocalDateTime(order.attributes.date)}</td>
                                <td>{order.attributes.customer?.attributes?.name}</td>
                                <td>${order.attributes.amount.attributes.totalDiscount.toFixed(2)}</td>
                                <td>${order.attributes.amount.attributes.totalTax.toFixed(2)}</td>
                                <td>${order.attributes.amount.attributes.totalAmount.toFixed(2)}</td>
                                <td>${order.attributes.amount.attributes.netTotal.toFixed(2)}</td>
                                <td>{order.attributes.status}</td>
                                <td>
                                    <div className="dropstart">
                                        <button className="btn btn-sm btn-light p-0 pb-1" data-bs-toggle="dropdown" aria-expanded="false"><FaEllipsisV className="small"/></button>
                                        <ul className="dropdown-menu">
                                            {
                                                !order.attributes.canceled && !order.attributes.completed &&
                                                <li><button onClick={()=>selectOrder(order)} className="btn btn-sm btn-light w-100 rounded-0">To checkout</button></li>
                                            }
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {
                    !orders.length &&
                    <div className="p-3">
                        <div className="h4">No Orders Found</div>
                        <div>It looks like there are no orders to display at this time.</div>
                        <div>If you need to place an order, please use the order entry feature. Once added, your orders will appear here!</div>
                    </div>
                }
            </div>
        </div>
    )
}