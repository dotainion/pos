import { useRef, useState } from "react";
import { ParseError } from "../../utils/ParseError";
import { useAuth } from "../../providers/AuthProvider";
import { closeAuthNotification } from "../../information/AuthNotification";

export const SignIn = () =>{
    const { signIn } = useAuth();

    const [errors, setErrors] = useState();

    const emailRef = useRef();
    const passwordRef = useRef();

    const onSubmit = (e) =>{
        e.stopPropagation();
        e.preventDefault();
        setErrors(null);

        signIn(emailRef.current.value, passwordRef.current.value, (response)=>{
            if(response.error){
                setErrors(new ParseError(response.error).message());
            }
        });
    }

    return(
        <form onSubmit={onSubmit}>
            <div className="d-flex align-items-center justify-content-center w-100 vh-100">
                <div className="small w-sm-100 p-3" style={{minWidth: '400px'}}>
                    <div className="h4 mb-3">Sign in</div>
                    <div>Don't have an account? Talk to you administrator for assistance</div>
                    {errors? <div className="text-danger">{errors}</div> : null}
                    <input ref={emailRef} className="form-control my-2" type="email" placeholder="email"/>
                    <input ref={passwordRef} className="form-control my-2" type="password" placeholder="password"/>
                    <span className="link-primary pointer my-3">Forget password?</span>
                    <button className="btn btn-sm btn-primary mt-3 d-block">Sign in</button>
                </div>
            </div>
        </form>
    )
}