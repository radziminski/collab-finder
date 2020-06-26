import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';
import { connect } from 'react-redux';

const SpinnerModal = ({ show }) => {
    const [displayType, setDisplayType] = useState('none');

    useEffect(() => {
        if (!show && displayType === 'block') {
            setTimeout(() => {
                setDisplayType('none');
            }, 310);
        }
        if (show && displayType === 'none') {
            setDisplayType('block');
        }
    });

    return (
        <div
            style={{ display: displayType }}
            className={`spiner-modal ${show ? 'animation-fade-in-fast' : 'animation-fade-out'}`}
        >
            <div className="u-center-absolute">
                <Spinner size="large" />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    show: state.profile.isLoading,
});

export default connect(mapStateToProps)(SpinnerModal);
