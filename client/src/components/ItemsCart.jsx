import React from 'react';

const ItemsCart = (props) => {
    let totalPrice = 0;
    let totalItems = 0;
    let totalItemWord = '';
    if (props.frequentItems !== undefined && props.frequentItems.length > 0) {

        props.frequentItems.forEach(el => { 
            if(el.checked) {
                totalPrice += el.price
                totalItems++;
            }
        });
        if (totalItems === 1) {
            totalItemWord = '';
        } else if (totalItems === 2) {
            totalItemWord = 'both items';
        } else if (totalItems === 3) {
            totalItemWord = 'all three items';
        }
    }
    if(totalPrice !== 0) {
        return (
            <div className="items-cart">
                <span className="price-line">Total Price: <div className="total-price">${totalPrice}</div></span>     
                <button>Add {totalItemWord} to cart</button>
            </div>
        )

    } else {
        return (
            <div></div>
        )
    }
}

export default ItemsCart;