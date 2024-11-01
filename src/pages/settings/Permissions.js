import React, { useEffect, useState } from "react";
import { api } from "../../request/Api";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/Loader";

export const Permissions = () => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [permissions, setPermissions] = useState([]);

    const params = useParams();

    const savePermission = (permission) =>{
        api.permission.set(permission).then((response)=>{
            
        }).catch((error)=>{
            console.log(error);
        });
    }

    useEffect(()=>{
        if(!params?.userId) return;
        let permissionLoading = true;
        let userLoading = true;

        api.permission.list({id: params.userId}).then((response)=>{
            setPermissions(response.data.data);
        }).catch((error)=>{

        }).finally(()=>{
            permissionLoading = false;
            if(!permissionLoading && !userLoading) setLoading(false);
        });

        api.user.fetch({id: params.userId}).then((response)=>{
            setUser(response.data.data[0]);
        }).catch((error)=>{

        }).finally(()=>{
            userLoading = false;
            if(!permissionLoading && !userLoading) setLoading(false);
        });
    }, []);

    if(loading) return <Loader/>

    return (
        <div className="container d-flex flex-column vh-100 pt-3">
            <h4 className="text-center mb-4">Assign Permissions</h4>
            {
                user && (
                    <>
                        <h5>User: {user.attributes.firstName} {user.attributes.lastName}</h5>
                        <h6>Email: {user.attributes.email}</h6>
                    </>
                )
            }
            <hr></hr>
            <div className="overflow-auto mb-auto">
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Entity</th>
                            <th>Permissions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {permissions.map((permission) => (
                            <tr key={permission.id}>
                                <td>{permission.attributes.table.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</td>
                                <td><PillPermission onChange={savePermission} permission={permission}/></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const PillPermission = ({onChange, permission}) => {
    const READ = 'Read';
    const WRITE = 'Write';
    const EDIT = 'Edit';
    const DELETE = 'Delete';

    const onPillChange = (cmd, checked) =>{
        if(cmd === READ) permission.attributes.read = checked;
        if(cmd === WRITE) permission.attributes.write = checked;
        if(cmd === EDIT) permission.attributes.edit = checked;
        if(cmd === DELETE) permission.attributes.delete = checked;
        onChange({id: permission.id, ...permission.attributes});
    }

    return (
        <div className="d-flex">
            <div className="d-flex rounded-pill border p-1">
                <Pill onChange={onPillChange} defaultChecked={permission.attributes.read}>{READ}</Pill>
                <Pill onChange={onPillChange} defaultChecked={permission.attributes.write}>{WRITE}</Pill>
                <Pill onChange={onPillChange} defaultChecked={permission.attributes.edit}>{EDIT}</Pill>
                <Pill onChange={onPillChange} defaultChecked={permission.attributes.delete}>{DELETE}</Pill>
            </div>
        </div>
    );
};

const Pill = ({onChange, defaultChecked, children}) => {
    const [isChecked, setIsChecked] = useState(defaultChecked);
  
    const onCheckboxChange = (e) => {
        const checked = !e.target.checked;
        setIsChecked(checked);
        onChange(children, checked);
    };

    return (
        <button
            className={`btn btn-sm rounded-pill mx-1 ${isChecked ? 'btn-success' : 'btn-light'}`}
            onClick={()=>onCheckboxChange({target: {checked: isChecked}})}
            style={{minWidth: '60px'}}
        >
            <span>{children}</span>
            <input 
                type="checkbox" 
                checked={isChecked} 
                onChange={onCheckboxChange} 
                style={{display: 'none'}}
            />
        </button>
    );
};
