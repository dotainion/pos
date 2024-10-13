import $ from "jquery";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../routes/routes";
import { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { api } from "../request/Api";

export const openAuthNotification = () => $(window).trigger('open-require-notification');
export const closeAuthNotification = () => $(window).trigger('close-require-notification');

export const AuthNotification = () =>{
    const { resetAuth } = useAuth();

    const [show, setShow] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const hideNotification = () =>{
        resetAuth();
        setShow(false);
        navigate(routes.signin());
    }

    useEffect(()=>{
        $(window).on('open-require-notification', ()=>{
            setShow(true);
        }).on('close-require-notification', ()=>{
            setShow(false);
        });
    }, []);

    useEffect(()=>{
        if(api.isAuthRoute()){
            setShow(false);
        }
    }, [location]);

    if(!show) return null;

    return(
        <div className="backdrop-bg position-absolute top-0 start-0 z-index-1 w-100 vh-100">
            <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                <div className="shadow-sm bg-white border rounded-3 p-4">
                    <div className="d-flex">
                        <div className="text-danger me-3">
                            <div className="fw-bold">You are no longer logged in</div>
                            <div className="me-3">Please log in again and try once more.</div>
                        </div>
                        <div className="d-flex align-items-center">
                            <button onClick={hideNotification} className="btn btn-sm btn-primary">Okay</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}