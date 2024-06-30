import { FaEllipsis } from "react-icons/fa6"
import { IoMdAdd } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { routes } from "../../routes/routes";

export const Discounts = () =>{
    const navigate = useNavigate();
    return(
        <>
            <div className="d-flex align-items-center text-nowrap w-100 mt-3">
                <div className="fw-bold w-100">Discounts</div>
                <button onClick={()=>navigate(routes.inv().nested().createDiscount())} className="d-flex align-items-center btn btn-sm btn-light text-primary">Create Discount<IoMdAdd className="ms-2"/></button>
            </div>
            <hr></hr>
            <div className="flex-column overflow-y-auto overflow-x-hidden">
                <table className="table">
                    <tbody>
                        {[1,2,2,1,2,1,2,2,1,2,1,2,2,1].map((product, key)=>(
                            <tr className="align-items-center" key={key}>
                                <td className="w-100">Some Discounts</td>
                                <td className="text-nowrap">Assign Items</td>
                                <td>
                                    <button className="d-flex align-items-center btn"><FaEllipsis/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}