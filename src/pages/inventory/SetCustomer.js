import { MdCategory } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../routes/routes";
import { api } from "../../request/Api";
import { useEffect, useRef, useState } from "react";
import { ParseError } from "../../utils/ParseError";
import { Input } from "../../widgets/Input";
import { Select } from "../../widgets/Select";
import { Loader } from "../../components/Loader";

export const SetCustomer = () =>{
    const [errors, setErrors] = useState();
    const [customer, setCustomer] = useState();
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const params = useParams();
    
    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const genderRef = useRef();

    const saveCategory = (e) =>{
        e.stopPropagation();
        e.preventDefault();
        setErrors(null);

        const data = {
            id: customer?.id || null,
            name: nameRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value,
            gender: genderRef.current.value,
            hide: customer?.attributes?.hide || false,
            date: customer?.attributes?.date || null,
        }

        api.customer.set(data).then((response)=>{
            navigate(routes.inv().nested().updateCustomer(response.data.data[0].id));
        }).catch((error)=>{
            setErrors(new ParseError(error).message());
        });
    }

    useEffect(()=>{
        if(!params?.customerId){
            setLoading(false);
            return;
        }

        api.customer.list({id: params.customerId}).then((response)=>{
            setCustomer(response.data.data[0]);
        }).catch((error)=>{

        }).finally(()=>{
            setLoading(false);
        });
    }, [params]);

    useEffect(()=>{
        if(!customer) return;
        nameRef.current.value = customer.attributes.name;
        emailRef.current.value = customer.attributes.email;
        phoneRef.current.value = customer.attributes.phone;
        genderRef.current.value = customer.attributes.gender;
    }, [customer]);

    if(loading) return <Loader/>;

    return(
        <form onSubmit={saveCategory}>
            <div className="d-flex align-items-center text-nowrap w-100 mt-3">
                <div className="fw-bold w-100">{!!params?.customerId ? 'Update Customer' : 'Create Customer'}</div>
                <button onClick={()=>navigate(routes.inv().nested().categories())} className="d-flex align-items-center btn btn-sm btn-light text-primary" type="button">Categories<MdCategory className="ms-2"/></button>
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
    )
}