import React from 'react';

const ButtonFull = ({ children, onClick, type }) => {
    return (
        <button type={type ? type : null} className="btn btn-full" onClick={onClick}>
            {children}
        </button>
    );
};

export default ButtonFull;
