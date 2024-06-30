export const SignIn = () =>{
    return(
        <div className="d-flex align-items-center justify-content-center w-100 vh-100">
            <div className="small" style={{minWidth: '400px'}}>
                <div className="h4 mb-3">Sign in</div>
                <div>Don't have an account? Sign up</div>
                <input className="form-control my-2" type="email" placeholder="email"/>
                <input className="form-control my-2" type="password" placeholder="password"/>
                <span className="link-primary pointer my-3">Forget password?</span>
                <button className="btn btn-sm btn-primary mt-3 d-block">Sign up</button>
            </div>
        </div>
    )
}