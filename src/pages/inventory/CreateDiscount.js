import { MdDiscount } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";
import { DiscountOptions } from "../../components/DiscountOptions";

export const CreateDiscount = () =>{
    const navigate = useNavigate();
    return(
        <div className="">
            <div className="d-flex align-items-center text-nowrap w-100 mt-3">
                <div className="fw-bold w-100">Create Discounts</div>
                <button onClick={()=>navigate(routes.inv().nested().discounts())} className="d-flex align-items-center btn btn-sm btn-light text-primary">Discounts<MdDiscount className="ms-2"/></button>
            </div>
            <hr></hr>
            <input className="form-control my-3" placeholder="Name"/>
            <DiscountOptions/>
            <select className="form-control form-select my-3">
                <option>Set this item as taxable</option>
                <option>Set this item as nonetaxable</option>
            </select>
            <textarea className="form-control my-3" placeholder="Item description"/>
        </div>
    )
}