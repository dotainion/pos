import { GoIssueDraft } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";
import { Search } from "../../../widgets/Search";
import { PosCategoryBar } from "../../../layout/PosCategoryBar";
import { useState } from "react";
import { usePos } from "../../../providers/PosProvider";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../routes/routes";

const tempCus = {
    attributes: {
        firstName: 'Fish',
        lastName: 'James'
    }
};
export const SearchCustomers = () =>{
    const { addCustomer } = usePos();

    const [customers, setCustomers] = useState([tempCus,tempCus,tempCus,tempCus,tempCus,tempCus,tempCus,tempCus,tempCus,tempCus,tempCus,tempCus,tempCus,tempCus,tempCus,tempCus,tempCus,tempCus,tempCus,tempCus,tempCus,tempCus,tempCus,tempCus,tempCus,tempCus,tempCus,tempCus,tempCus,tempCus]);

    const navigate = useNavigate();

    const selectCustomer = (customer) =>{
        addCustomer(customer);
        navigate(routes.pos().nested().products());
    }

    return(
        <>
            <div className="mt-4">
                <Search/>
                <PosCategoryBar/>
            </div>
            <div className="my-3">
                <button className="d-flex align-items-center btn btn-sm btn-light text-primary">New Customer <IoMdAdd/></button>
            </div>
            <div className="flex-column overflow-y-auto overflow-x-hidden">
                <div className="row px-2">
                    {customers.map((cus, key)=>(
                        <div className="col-4 col-sm-4 col-md-4 col-lg-3 col-xl-2 col-xxl-2 p-1" key={key}>
                            <div onClick={()=>selectCustomer(cus)} className="card small pointer position-relative">
                                <div style={{height: '100px'}}>
                                    <img className="img-fluid rounded-top-1 w-100 h-100" src="https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg=" alt=""/>
                                </div>
                                <div className="px-2 mb-1">
                                    <div className="text-truncate">{cus.attributes.firstName} {cus.attributes.lastName}</div>
                                    <div className="d-flex align-items-center">
                                        <GoIssueDraft className="me-2"/>
                                        <div>Draft: none</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}