import { forwardRef, useEffect, useRef } from "react";
import $ from "jquery";

export const Select = forwardRef(({title, defaultValue, onChange, children}, ref) =>{
    return(
        <div className="position-relative my-3 w-100">
            <div className="bg-white position-absolute top-0 start-0 small ms-2" style={{marginTop: '-11px'}}>{title}</div>            
            <select ref={ref} onChange={onChange} className="form-control form-select my-3" defaultValue={defaultValue}>
                {children}
            </select>
        </div>
    )
})