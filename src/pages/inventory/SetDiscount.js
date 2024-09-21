import { MdDiscount } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../routes/routes";
import { DiscountOptions } from "../../components/DiscountOptions";
import { api } from "../../request/Api";
import { useEffect, useRef, useState } from "react";
import { ParseError } from "../../utils/ParseError";
import { Input } from "../../widgets/Input";
import { Texarea } from "../../widgets/Textarea";
import { Select } from "../../widgets/Select";
import { Loader } from "../../components/Loader";

export const SetDiscount = () =>{
    const [errors, setErrors] = useState();
    const [discount, setDiscount] = useState();
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const params = useParams();

    const nameRef = useRef()
    const isTaxableRef = useRef();
    const descriptionRef = useRef();
    const disOptionRef = useRef({value: null, type: null});

    const saveDiscount = (e) =>{
        e.stopPropagation();
        e.preventDefault();
        setErrors(null);

        const data = {
            id: discount?.id || null,
            name: nameRef.current.value,
            type: disOptionRef.current.type,
            value: disOptionRef.current.value,
            isTaxable: isTaxableRef.current.value ? 1 : '',
            description: descriptionRef.current.value,
        }

        api.discount.set(data).then((response)=>{
            navigate(routes.inv().nested().updateDiscount(response.data.data[0].id));
        }).catch((error)=>{
            setErrors(new ParseError(error).message());
        });
    }

    useEffect(()=>{
        if(!params?.discountId){
            setLoading(false);
            return;
        }

        api.discount.list({id: params.discountId}).then((response)=>{
            setDiscount(response.data.data[0]);
        }).catch((error)=>{

        }).finally(()=>{
            setLoading(false);
        });
    }, [params]);

    useEffect(()=>{
        if(!discount || !disOptionRef.current) return;
        nameRef.current.value = discount.attributes.name;
        isTaxableRef.current.value = discount.attributes.isTaxable;
        descriptionRef.current.value = discount.attributes.description;
        disOptionRef.current.update({
            type: discount.attributes.type,
            value: discount.attributes.value
        });
    }, [discount]);

    if(loading) return <Loader/>;

    return(
        <form onSubmit={saveDiscount}>
            <div className="d-flex align-items-center text-nowrap w-100 mt-3">
                <div className="fw-bold w-100">{!!params?.discountId ? 'Update Discounts' : 'Create Discounts'}</div>
                <button onClick={()=>navigate(routes.inv().nested().discounts())} className="d-flex align-items-center btn btn-sm btn-light text-primary" type="button">Discounts<MdDiscount className="ms-2"/></button>
            </div>
            <hr></hr>
            {errors ? <div className="text-danger">{errors}</div> : null}
            <Input ref={nameRef} title="Name" />
            <DiscountOptions ref={disOptionRef}/>
            <Select ref={isTaxableRef} title="Taxable">
                <option value={1}>Set this item as taxable</option>
                <option value={''}>Set this item as nonetaxable</option>
            </Select>
            <Texarea ref={descriptionRef} title="Description"/>
            <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-sm btn-dark px-4">Save</button>
            </div>
        </form>
    )
}