import React, { useEffect, useRef } from 'react';
import $ from 'jquery';

export const FormMessgeControl = ({message, formControl}) => {
    const errorRef = useRef();

    useEffect(() => {
        if(!errorRef.current) return;

        const formElement = $(errorRef.current).closest('form').get(0);

        if (!formElement) {
            throw new Error('FormMessgeControl component must be inside a <form> tag.');
        }

        const handleChange = (e) => {
            formControl?.(e);
        }

        $(formElement).on('input', handleChange);

        return () => {
            $(formElement).off('input', handleChange);
        }
    }, []);

    return(
        <div ref={errorRef}>
            {message ? <div className="error">{message}</div> : null}
        </div>
    );
}