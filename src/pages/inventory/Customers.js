import { FaEllipsis } from "react-icons/fa6"
import { IoMdAdd } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { routes } from "../../routes/routes";
import { useEffect, useState } from "react";
import { api } from "../../request/Api";
import { Loader } from "../../components/Loader";

export const Customers = () =>{
    const [customers, setCustomers] = useState([]);
    const [limit, setLimit] = useState(100);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(()=>{
        api.customer.list({limit: limit}).then((response)=>{
            setCustomers(response.data.data);
        }).catch((error)=>{

        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    if(loading) return <Loader center/>;

    return(
        <>
            <div className="d-flex align-items-center text-nowrap w-100 mt-3">
                <div className="fw-bold w-100">Customers</div>
                <button onClick={()=>navigate(routes.inv().nested().createCustomer())} className="d-flex align-items-center btn btn-sm btn-light text-primary">Create Customer<IoMdAdd className="ms-2"/></button>
            </div>
            <hr></hr>
            <div className="flex-column overflow-y-auto overflow-x-hidden">
                <table className="table">
                    <tbody>
                        {customers.map((customer)=>(
                            <tr className="align-items-center" key={customer.id}>
                                <td className="w-100">{customer.attributes.name}</td>
                                <td className="text-nowrap">{customer.attributes.email}</td>
                                <td>
                                    <div className="dropstart">
                                        <button className="d-flex align-items-center btn" data-bs-toggle="dropdown" aria-expanded="false"><FaEllipsis/></button>
                                        <ul className="dropdown-menu">
                                            <li><button onClick={()=>navigate(routes.inv().nested().updateCustomer(customer.id))} className="btn btn-sm btn-light w-100 rounded-0">Edit</button></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}