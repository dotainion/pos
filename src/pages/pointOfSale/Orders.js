import { FaEllipsis } from "react-icons/fa6";
import { Search } from "../../widgets/Search";
import { AiOutlineBorderlessTable } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";

export const Orders = () =>{

    const navigate = useNavigate();

    const selectOrder = () =>{
        //might have customer with order not sure yet...
        navigate(routes.pos().nested().products());
    }
    
    return(
        <div className="container">
            <div className="my-3">
                <Search/>
            </div>
            <div className="flex-column overflow-y-auto overflow-x-hidden">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className="td-m"></th>
                            <th scope="col">Type</th>
                            <th scope="col">Location</th>
                            <th scope="col">Order #</th>
                            <th scope="col">Date</th>
                            <th scope="col">Customer</th>
                            <th className="td-s">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1,2,2,1,2,1,2,2,1,2,1,2,2,1,2,1,2,2,1,2,1,2,2,1,2,1,2,2,1,2,1,2,2,1,2,1,2,2,1,2,1,2,2,1,2,1].map((order, key)=>(
                            <tr onClick={()=>selectOrder(order)} className="align-items-center pointer" key={key}>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <AiOutlineBorderlessTable/>
                                        <span className="ms-2">Pickup</span>
                                    </div>
                                </td>
                                <td>Red Elephant</td>
                                <td>1528503851</td>
                                <td>Jun, 12 2024</td>
                                <td><strong>Available to sell:</strong>15</td>
                                <td><strong>Price:</strong>$36.21</td>
                                <td>Pending</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}