import React from 'react';

const ReviewModal = ({handleClose, show, children}) => {
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}
                Hello There
                <button onClick={handleClose}>Close</button>

            </section>
        </div>
    )
}

export default ReviewModal;