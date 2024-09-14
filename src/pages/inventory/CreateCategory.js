import { MdCategory } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";

export const CreateCategory = () =>{
    const navigate = useNavigate();
    return(
        <div className="">
            <div className="d-flex align-items-center text-nowrap w-100 mt-3">
                <div className="fw-bold w-100">Create Category</div>
                <button onClick={()=>navigate(routes.inv().nested().categories())} className="d-flex align-items-center btn btn-sm btn-light text-primary">Categories<MdCategory className="ms-2"/></button>
            </div>
            <hr></hr>
            <input className="form-control my-3" placeholder="Name"/>
            <input className="form-control my-3" placeholder="Price"/>
            <textarea className="form-control my-3" placeholder="Item description"/>
        </div>
    )
}