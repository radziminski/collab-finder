import React from 'react';

const Modal = ({ children, onClose, open }) => {
    if (!open) return null;

    return (
        <>
            <div className="modal-bg" onClick={onClose} />
            <div className="modal-window">
                <div className="u-full-size">
                    <button onClick={onClose} className="modal-close-btn">
                        <i className="fa fa-times" />
                    </button>
                    {children}
                </div>
            </div>
        </>
    );
};

export default Modal;
