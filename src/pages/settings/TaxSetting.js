import { useEffect, useRef, useState } from "react"
import { Input } from "../../widgets/Input"
import { Select } from "../../widgets/Select"
import { Texarea } from "../../widgets/Textarea"
import { api } from "../../request/Api"
import { utils } from "../../utils/Utils"
import { ParseError } from "../../utils/ParseError"
import { Loader } from "../../components/Loader"
import { Switch } from "../../widgets/Switch"

export const TaxSetting = () =>{
    const [taxes, setTaxes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = useState();
    const [loading, setLoading] = useState(true);

    const DEFAULT_TAX_CATEGORY = 'Select a tax category';
    const DEFAULT_CREATE_TAX_CATEGORY = 'Apply to all category';

    const setTax = (e, tax) =>{
        tax.attributes.categoryId = e.target.value;
        api.tax.set({...tax, ...tax.attributes}).then((response)=>{
            //setTaxes((taxList)=>[response.data.data[0], ...taxList.filter((t)=>t.id === tax.id ? tax : t)]);
        }).catch((error)=>{
            setErrors(new ParseError(error).message());
        });
    }

    const setActive = (e, tax) =>{
        tax.attributes.active = e.target.checked;
        api.tax.set({...tax, ...tax.attributes}).then((response)=>{
            //this this to be here to avoid from updating continuously
        }).catch((error)=>{
            setErrors(new ParseError(error).message());
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(null);

        const form = new FormData(e.target);
        const data = { 
            id: '',
            name: form.get('name'),
            categoryId: form.get('categoryId'),
            value: form.get('value'),
            description: form.get('description'),
        }

        api.tax.set(data).then((response)=>{
            setTaxes((taxList)=>[response.data.data[0], ...taxList]);
            setIsModalOpen(false);
            form.reset();
        }).catch((error)=>{
            setErrors(new ParseError(error).message());
        });
    };

    const onDelete = (data) => {
        setErrors(null);
        data.attributes.delete = true;
        api.tax.set({...data, ...data.attributes}).then((response)=>{
            setTaxes((taxList)=>[...taxList.filter((tax)=>tax.id !== data.id)]);
        }).catch((error)=>{
            setErrors(new ParseError(error).message());
        });
    };

    useEffect(()=>{
        let loadingCategory = true;
        let loadingTaxes = true;
        api.category.list({limit: false}).then((response)=>{
            setCategories(response.data.data);
        }).catch((error)=>{

        }).finally(()=>{
            loadingCategory = false;
            if(!loadingCategory && !loadingTaxes) setLoading(false);
        });
        api.tax.list({limit: false}).then((response)=>{
            setTaxes(response.data.data);
        }).catch((error)=>{

        }).finally(()=>{
            loadingTaxes = false;
            if(!loadingCategory && !loadingTaxes) setLoading(false);
        });
    }, []);

    if(loading){
        return(
            <div className="d-flex align-items-center justify-content-center w-100 h-100">
                <Loader/>
            </div>
        )
    }

    return (
        <div className="container mt-4">
            <h4 className="text-center mb-4">Tax Rates Management</h4>
            <button onClick={()=>setIsModalOpen(true)} className="btn btn-sm btn-primary">Add Tax Rate</button>

            <hr></hr>

            <div className="row">
                {taxes.map((tax, key) => (
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6 mb-4" key={`${tax.id}${key}`}>
                        <div className="card shadow-sm h-100">
                            <div className="card-header bg-white border-light d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">{tax.attributes.name}</h5>
                                <div className="dropdown">
                                    <button className="btn btn-secondary btn-close" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
                                    <ul class="dropdown-menu z-index-2">
                                        <li><a onClick={()=>onDelete(tax)} className="dropdown-item text-danger" href="#">Confirm Delete</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card-body pb-0 pt-0">
                                <div className="card-text">
                                    <Select onChange={(e)=>setTax(e, tax)} title="Category" name="categoryId" defaultValue={tax.attributes.categoryId}>
                                        <option value="">{DEFAULT_CREATE_TAX_CATEGORY}</option>
                                        {categories.map((category)=>(
                                            <option value={category.id} key={category.id}>{category.attributes.name}</option>
                                        ))}
                                    </Select>
                                </div>
                                <div className="card-text display-5 text-center fw-bold my-3"><strong></strong>{tax.attributes.value}%</div>
                                <div className="d-flex justify-content-between">
                                    <Switch onChange={(e)=>setActive(e, tax)} onLabel="Active" offLabel="Inactive" defaultChecked={tax.attributes.active}/>
                                    <div className="card-text small">{utils.date.toLocalDate(tax.attributes.date)}</div>
                                </div>
                            </div>
                            <div className="py-2 px-3 text-secondary">{tax.attributes.description}</div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="modal show z-index-2" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content shadow">
                            <div className="modal-header py-2">
                                <div className="h4 modal-title">Add New Tax Rate</div>
                                <button className="btn btn-sm btn-close" onClick={()=>setIsModalOpen(false)}></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    {errors ? <div className="text-danger">{errors}</div> : null}
                                    <Input title="Tax Rate Name" name="name" />
                                    <Select title="Apply tax based on category" name="categoryId">
                                        <option>Apply to all category</option>
                                        {categories.map((category)=>(
                                            <option value={category.id} key={category.id}>{category.attributes.name}</option>
                                        ))}
                                        <option hidden>{DEFAULT_TAX_CATEGORY}</option>
                                    </Select>
                                    <Input title="Tax Rate (%)" name="value" type="number" />
                                    <Texarea title="Notes/Comments" name="description" />
                                </div>
                                <div className="modal-footer py-2">
                                    <button className="btn btn-sm btn-success" type="submit">Save</button>
                                    <button className="btn btn-sm btn-secondary" onClick={()=>setIsModalOpen(false)} type="button">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

