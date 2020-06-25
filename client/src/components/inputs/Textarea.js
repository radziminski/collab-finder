import React, { useState } from 'react';

const Textarea = ({ onChange, defaultValue, label, type, required, icon, placeholder }) => {
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
            <textarea
                name={label}
                value={value}
                onChange={onInputChange}
                required={required ? true : false}
                className="text-input text-input-area"
                placeholder={placeholder}
            />
            <div className="text-input-icon">
                <i className={icon} />
            </div>
        </div>
    );
};

export default Textarea;
