import React, { useState } from 'react';

const TextInput = ({ onChange, defaultValue, label, type, required, icon, placeholder }) => {
    const [value, setValue] = useState(defaultValue || '');

    const onInputChange = (e) => {
        setValue(e.target.value);
        onChange(e.target.value);
    };

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
