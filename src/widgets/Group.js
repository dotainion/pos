import { forwardRef, useEffect, useRef } from "react";
import $ from "jquery";

export const Group = ({title, children}) =>{
    return(
        <div className="d-flex group align-items-center position-relative w-100">
            <div className="bg-white position-absolute top-0 start-0 small ms-2 z-index-1" style={{marginTop: '-11px'}}>{title}</div>            
            {children}
        </div>
    )
}