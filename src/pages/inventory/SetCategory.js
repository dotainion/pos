import { MdCategory } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../routes/routes";
import { api } from "../../request/Api";
import { useEffect, useRef, useState } from "react";
import { ParseError } from "../../utils/ParseError";
import { Switch } from "../../widgets/Switch";
import { ColarPicker } from "../../widgets/ColarPicker";
import { Input } from "../../widgets/Input";
import { Texarea } from "../../widgets/Textarea";
import { Loader } from "../../components/Loader";

export const SetCategory = () =>{
    const [errors, setErrors] = useState();
    const [category, setCategory] = useState();
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const params = useParams();

    const nameRef = useRef()
    const inactiveRef = useRef();
    const descriptionRef = useRef();
    const colorRef = useRef();

    const saveCategory = (e) =>{
        e.stopPropagation();
        e.preventDefault();
        setErrors(null);

        const data = {
            id: category?.id || null,
            name: nameRef.current.value,
            color: colorRef.current.value,
            inactive: inactiveRef.current.value,
            description: descriptionRef.current.value,
        }

        api.category.set(data).then((response)=>{
            navigate(routes.inv().nested().updateCategory(response.data.data[0].id));
        }).catch((error)=>{
            setErrors(new ParseError(error).message());
        });
    }

    useEffect(()=>{
        if(!params?.categoryId){
            setLoading(false);
            return;
        }

        //need to pass category id
        api.category.list({id: params.categoryId}).then((response)=>{
            setCategory(response.data.data[0]);
        }).catch((error)=>{

        }).finally(()=>{
            setLoading(false);
        });
    }, [params]);

    useEffect(()=>{
        if(!category) return;
        nameRef.current.value = category.attributes.name;
        inactiveRef.current.value = category.attributes.inactive;
        descriptionRef.current.value = category.attributes.description;
    }, [category]);

    if(loading) return <Loader/>;

    return(
        <form onSubmit={saveCategory}>
            <div className="d-flex align-items-center text-nowrap w-100 mt-3">
                <div className="fw-bold w-100">{!!params?.categoryId ? 'Update Category' : 'Create Category'}</div>
                <button onClick={()=>navigate(routes.inv().nested().categories())} className="d-flex align-items-center btn btn-sm btn-light text-primary" type="button">Categories<MdCategory className="ms-2"/></button>
            </div>
            <hr></hr>
            {errors ? <div className="text-danger">{errors}</div> : null}
            <Input ref={nameRef} title="Name" />
            <Texarea ref={descriptionRef} title="Description"/>
            <Switch ref={inactiveRef} onLabel="Active" offLabel="Inactive" defaultChecked={true}/>
            <hr></hr>
            <ColarPicker ref={colorRef}/>
            <hr></hr>
            <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-sm btn-dark px-4">Save</button>
            </div>
        </form>
    )
}