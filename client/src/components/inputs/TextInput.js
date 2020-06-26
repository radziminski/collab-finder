import React, { useState, useEffect } from 'react';
import { set } from 'mongoose';

const TextInput = ({ onChange, defaultValue, label, type, required, icon, placeholder, designType, subtitle }) => {
    const [value, setValue] = useState(defaultValue || '');

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    const onInputChange = (e) => {
        setValue(e.target.value);
        onChange(e.target.value);
    };
    if (designType === 'inline') {
        return (
            <div className="text-input-container-inline">
                <div className="text-input-icon-inline">
                    <i className={icon} />
                </div>
                <label htmlFor={label} className="text-input-label-inline">
                    {label}
                </label>
                <input
                    name={label}
                    type={type ? type : 'text'}
                    value={value}
                    onChange={onInputChange}
                    required={required ? true : false}
                    className="text-input text-input-inline"
                    placeholder={placeholder}
                />
            </div>
        );
    }

    return (
        <>
            <div className="text-input-container">
                <label htmlFor={label} className="text-input-label">
                    {label}
                </label>
                <input
                    name={label}
                    type={type ? type : 'text'}
                    value={value}
                    onChange={onInputChange}
                    required={required ? true : false}
                    className="text-input"
                    placeholder={placeholder}
                />
                <div className="text-input-icon">
                    <i className={icon} />
                </div>
            </div>
            {subtitle ? <div className="text-input-subtitle">{subtitle}</div> : null}
        </>
    );
};

export default TextInput;
