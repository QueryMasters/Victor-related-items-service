import React from 'react';

const ReviewModal = ({handleClose, show}) => {

    const showHideClassName = show ? 'modal display-block' : 'modal display-none';

    return (
        <div className={showHideClassName}>
            <div className="modal-main">
                <button onClick={handleClose} className="close-reviews-button">Close</button>
                <div>Create a Review</div>
                <hr/>
                <div>Overall Rating</div>
                <hr/>
                <div>Add photo or video</div>
                <hr/>
                {/* <div>Add a headline</div> */}
                <form action="POST" className="review-form">
                    <p className = "review-form-item-headline review-form-item-headline">
                        <label className="review-label">Add a headline</label>
                        <input type="text" placeholder="What is most important to know?"/>
                    </p>
                    <p className = "review-form-item">
                        <label className="review-label">Write your review</label>
                        <textarea placeholder="What did you like or dislike? What did you use this product for?"/>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default ReviewModal;