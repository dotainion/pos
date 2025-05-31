import React, { useEffect, useState } from "react";
import { routes } from "../../routes/routes";
import { useNavigate } from "react-router-dom";
import { api } from "../../request/Api";
import { Loader } from "../../components/Loader";
import { IoMdAdd } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import { GrShieldSecurity } from "react-icons/gr";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(()=>{
        api.user.list().then((response)=>{
            setUsers(response.data.data);
        }).catch((error)=>{

        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    if(loading) return <Loader center/>

    return (
        <div className="container d-flex flex-column vh-100 pt-3">
            <h4 className="text-center mb-4">Assign Permissions</h4>
            <div>
                <button onClick={()=>navigate(routes.setting().nested().createUser())} className="d-flex align-items-center btn btn-sm btn-light border px-3">New User<IoMdAdd className="ms-2"/></button>
            </div>
            <hr></hr>
            <div className="overflow-auto">
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>User name</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user)=>(
                            <tr key={user.id}>
                                <td>{user.attributes.firstName} {user.attributes.lastName}</td>
                                <td>{user.attributes.email}</td>
                                <td>
                                    <div className="d-flex">
                                        <button onClick={()=>navigate(routes.setting().nested().updateUser(user.id))} className="d-flex align-items-center btn btn-sm btn-outline-primary px-3 mx-1">Edit<FaUserEdit className="ms-2"/></button>
                                        <button onClick={()=>navigate(routes.setting().nested().permission(user.id))} className="d-flex align-items-center btn btn-sm btn-outline-warning px-3 mx-1">Assign Permission<GrShieldSecurity className="ms-2"/></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

