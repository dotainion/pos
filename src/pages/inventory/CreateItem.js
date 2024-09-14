import { FaSitemap } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";

export const CreateItem = () =>{
    const navigate = useNavigate();
    return(
        <div className="">
            <div className="d-flex align-items-center text-nowrap w-100 mt-3">
                <div className="fw-bold w-100">Create Item</div>
                <button onClick={()=>navigate(routes.inv().nested().products())} className="d-flex align-items-center btn btn-sm btn-light text-primary">Items<FaSitemap className="ms-2"/></button>
            </div>
            <hr></hr>
            <input className="form-control my-3" placeholder="Name"/>
            <select className="form-control form-select my-3">
                <option>Category</option>
            </select>
            <input className="form-control my-3" placeholder="Price" type="number"/>
            <input className="form-control my-3" placeholder="Quantity" type="number"/>
            <select className="form-control form-select my-3">
                <option>Set this item as taxable</option>
                <option>Set this item as nonetaxable</option>
            </select>
            <textarea className="form-control my-3" placeholder="Item description"/>
        </div>
    )
}