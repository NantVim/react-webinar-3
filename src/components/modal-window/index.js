import React from "react";
import PropTypes from 'prop-types';
import './style.css';

import Head from '../head';

function ModalWindow({ title, onCloseModal, children }) {
    return (
        <div className='Modal'>
            <div className='Modal-wrapper'>
                <Head title={title}>
                    <button onClick={onCloseModal}>Закрыть</button>
                </Head>
                <div className='Modal-content'>
                    {children}
                </div>
            </div>
        </div>
    );
}

ModalWindow.PropTypes = {
    title: PropTypes.string,
    onCloseModal: PropTypes.func.isRequired,
    children: PropTypes.node
}

ModalWindow.defaultProps = {
    title: 'Modal Window'
}

export default React.memo(ModalWindow);
