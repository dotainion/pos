import React, { useEffect, useRef, useState } from "react";
import { Input } from "../../widgets/Input";
import { api } from "../../request/Api";
import { ParseError } from "../../utils/ParseError";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { Select } from "../../widgets/Select";

export const SetUser = () => {
    const [errors, setErrors] = useState();
    const [loading, setLoading] = useState(false);

    const params = useParams();

    const userIdRef = useRef({value: null});
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const phoneNumberRef = useRef();
    const genderRef = useRef();
    const passwordRef = useRef();
    const addressIdRef = useRef({value: null});
    const countryRef = useRef();
    const stateRef = useRef();
    const addressRef = useRef();
    const aptRef = useRef();
    const zipRef = useRef();

    const submitUser = () => {
        const data = {
            id: userIdRef.current.value,
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
            phoneNumber: phoneNumberRef.current.value,
            gender: genderRef.current.value,
            password: passwordRef.current.value,
            confirmPassword: passwordRef.current.value
        };

        const attribute = params?.userId ? 'update' : 'create';
        api.user[attribute](data).then((response)=>{
            
        }).catch((error)=>{
            setErrors(new ParseError(error).message());
        });
    };

    const submitAddress = () => {
        const data = {
            id: addressIdRef.current.value,
            country: countryRef.current.value,
            state: stateRef.current.value,
            address: addressRef.current.value,
            apt: aptRef.current.value,
            zip: zipRef.current.value,
        };

        api.address.set(data).then((response)=>{
            
        }).catch((error)=>{
            setErrors(new ParseError(error).message());
        });
    };

    const save = () =>{
        submitUser();
        submitAddress();
    }

    useEffect(()=>{
        userIdRef.current = {value: null};
        addressIdRef.current = {value: null};
        if(!params?.userId) return;
        setLoading(true);

        let loadingUser = true;
        let loadingAddress = true;
        api.user.fetch({id: params.userId}).then((response)=>{
            const user = response.data.data[0];
            userIdRef.current = {value: user.id};
            firstNameRef.current.value = user.attributes.firstName;
            lastNameRef.current.value = user.attributes.lastName;
            emailRef.current.value = user.attributes.email;
            phoneNumberRef.current.value = user.attributes.phoneNumber;
            genderRef.current.value = user.attributes.gender;
        }).catch((error)=>{
            setErrors(new ParseError(error).message());
        }).finally(()=>{
            loadingUser = false;
            if(!loadingUser && !loadingAddress) setLoading(false);
        });;

        api.address.fetch({id: params.userId}).then((response)=>{
            const address = response.data.data[0];
            addressIdRef.current = {value: address.id};
            countryRef.current.value = address.attributes.country;
            stateRef.current.value = address.attributes.state;
            addressRef.current.value = address.attributes.address;
            aptRef.current.value = address.attributes.apt;
            zipRef.current.value = address.attributes.zip;
        }).catch((error)=>{
            setErrors(new ParseError(error).message());
        }).finally(()=>{
            loadingAddress = false;
            if(!loadingUser && !loadingAddress) setLoading(false);
        });;
    }, [params]);

    if(loading) return <Loader/>

    return (
        <div className="container mt-4 px-2">
            <h4 className="text-center">User and Address Information</h4>

            <div className="row">
                <div className="card bg-light mt-4">
                    <div className="card-body">
                        <div className="fw-bold text-secondary">User</div>
                        <hr className="mt-0"></hr>
                        <Input ref={firstNameRef} title="First Name"/>
                        <Input ref={lastNameRef} title="Last Name"/>
                        <Input ref={emailRef} title="Email"/>
                        <Input ref={phoneNumberRef} title="Phone Number"/>
                        <Select ref={genderRef} title="Gender">
                            <option value="" hidden>Select a gender</option>
                            <option>Male</option>
                            <option>Female</option>
                        </Select>
                    </div>
                </div>

                <div className="card bg-light mt-4">
                    <div className="card-body">
                        <div className="fw-bold text-secondary">Address</div>
                        <hr className="mt-0"></hr>
                        <Input ref={countryRef} title="Country"/>
                        <Input ref={stateRef} title="State"/>
                        <Input ref={addressRef} title="Address"/>
                        <Input ref={aptRef} title="Apartment/Suite"/>
                        <Input ref={zipRef} title="Zip Code"/>
                    </div>
                </div>

                <div className="card bg-light mt-4">
                    <div className="card-body">
                        <div className="fw-bold text-secondary">Password</div>
                        <hr className="mt-0"></hr>
                        {
                            params?.userId 
                            ? <>
                                <button className="btn btn-sm btn-primary me-2">Send reset password</button>
                                <button className="btn btn-sm btn-primary">Change password</button>
                            </>
                            : <Input ref={passwordRef} title="Password" type="password"/>
                        }
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center my-5">
                <button onClick={save} type="submit" className="btn btn-primary">Submit</button> 
            </div>
        </div>
    );
};

