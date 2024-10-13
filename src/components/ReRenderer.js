import { Fragment, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ReRenderer = ({rerender, children}) =>{
    const location = useLocation();

    useEffect(() => {
        if(rerender) rerender(location.key);
    }, [location]);

    return(
        <Fragment key={location.key}>
            {children}
        </Fragment>
    )
}