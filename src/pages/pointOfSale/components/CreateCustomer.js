import { GoIssueDraft } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";
import { Search } from "../../../widgets/Search";
import { PosCategoryBar } from "../../../layout/PosCategoryBar";
import { useEffect, useRef, useState } from "react";
import { usePos } from "../../../providers/PosProvider";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../routes/routes";
import { api } from "../../../request/Api";
import { Loader } from "../../../components/Loader";
import { ParseError } from "../../../utils/ParseError";
import { SetCustomer } from "../../inventory/SetCustomer";
import { Input } from "../../../widgets/Input";
import { Select } from "../../../widgets/Select";

export const CreateCustomer = () =>{
    const { addCustomer } = usePos();

    const [errors, setErrors] = useState();

    const navigate = useNavigate();

    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const genderRef = useRef();

    const saveCustomer = (e) =>{
        e.stopPropagation();
        e.preventDefault();
        setErrors(null);

        const data = {
            id: null,
            name: nameRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value,
            gender: genderRef.current.value,
            hide: false,
            date: null,
        }

        api.customer.set(data).then((response)=>{
            navigate(routes.pos().nested().customers());
        }).catch((error)=>{
            setErrors(new ParseError(error).message());
        });
    }

    return(
        <>
            <PosCategoryBar/>
            <form onSubmit={saveCustomer}>
                <div className="d-flex align-items-center text-nowrap w-100 mt-3">
                    <div className="fw-bold w-100">Create Customer</div>
                </div>
                <hr></hr>
                {errors ? <div className="text-danger">{errors}</div> : null}
                <Input ref={nameRef} title="Name" />
                <Input ref={emailRef} title="Email" />
                <Input ref={phoneRef} title="Phone" />
                <Select ref={genderRef} title="Gender">
                    <option>Male</option>
                    <option>Female</option>
                </Select>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-sm btn-dark px-4">Save</button>
                </div>
            </form>
        </>
    )
}