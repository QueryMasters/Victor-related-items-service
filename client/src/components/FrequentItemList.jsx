import React from 'react';
import FrequentImages from './FrequentImages.jsx';
import ItemsCart from './ItemsCart.jsx';
import Checkbox from './Checkbox.jsx';

class FrequentItemList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        } 
    }

    

    render() {
        return (
            <div className="frequent-item-list">
                Frequently bought together
                <FrequentImages />
                <ItemsCart />
                <Checkbox />

            </div>
        )
    }
}

export default FrequentItemList;