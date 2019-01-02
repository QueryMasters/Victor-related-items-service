import React from 'react';
import ReviewModal from './ReviewModal.jsx';

const ReviewModalContainer = ({handleClose, showReviewsModal, showReviews, children} ) => {

    return (
        <div className="reviews-modal">
            <div className="reviews-title">Review this product</div>
            <p>Share your thoughts with other customers</p>
            <ReviewModal show={showReviewsModal} handleClose={handleClose} />
            <button type='button' onClick={showReviews} className="write-review-button">Write a customer review</button>

        </div>
    )
}

export default ReviewModalContainer;