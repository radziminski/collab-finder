import React, { useState } from 'react';

const TextInput = ({ onChange, defaultValue, label, type, required, icon, placeholder, designType }) => {
    const [value, setValue] = useState(defaultValue || '');

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
                    className="text-input"
                    placeholder={placeholder}
                />
            </div>
        );
    }

    return (
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
    );
};

export default TextInput;
