import { FaEllipsis } from "react-icons/fa6";
import { Search } from "../../widgets/Search";
import { AiOutlineBorderlessTable } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";
import { useEffect, useState } from "react";
import { api } from "../../request/Api";
import { Loader } from "../../components/Loader";

export const Orders = () =>{
    const [orders, setOrders] = useState([]);
    const [limit, setLimit] = useState(100);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const selectOrder = () =>{
        //might have customer with order not sure yet...
        navigate(routes.pos().nested().products());
    }

    useEffect(()=>{
        api.order.list({limit: limit}).then((response)=>{
            setOrders(response.data.data);
        }).catch((error)=>{

        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    /**
    protected Id $id;
    protected ?Id $customerId = null;
    protected bool $completed;
    protected bool $canceled;
    protected Collector $items;
    protected Collector $discounts;

    */

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
                            <th>Total</th>
                            <th>Net</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order)=>(
                            <tr onClick={()=>selectOrder(order)} className="align-items-center pointer" key={order.id}>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <AiOutlineBorderlessTable/>
                                        <span className="ms-1" title={order.id}>{order.attributes.orderNumber}</span>
                                    </div>
                                </td>
                                <td>Jun, 12 2024</td>
                                <td>{order.attributes.customer?.attributes?.name}</td>
                                <td>{parseFloat(order.attributes.totalDiscountAmount).toFixed(2)}</td>
                                <td>{parseFloat(order.attributes.subTotal).toFixed(2)}</td>
                                <td>{parseFloat(order.attributes.total).toFixed(2)}</td>
                                <td>{order.attributes.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}