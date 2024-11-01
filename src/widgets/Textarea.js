import { forwardRef, useEffect, useRef } from "react";
import $ from "jquery";

export const Texarea = forwardRef(({title, name, placeholder}, ref) =>{
    const texareaRef = useRef();
    const titleRef = useRef();

    useEffect(()=>{
        $(ref?.current || texareaRef.current).on('input', (e)=>{
            if(e.target.value) $(titleRef.current).show('fast');
            else $(titleRef.current).hide('fast');
        }).trigger('input');
    }, []);

    return(
        <div className="position-relative my-4">
            <div ref={titleRef} className="bg-white position-absolute top-0 start-0 small ms-2 z-index-1" style={{marginTop: '-11px', display: 'none'}}>{title}</div>
            <textarea ref={ref || texareaRef} className="form-control" name={name} placeholder={placeholder || title}/>
        </div>
    )
})