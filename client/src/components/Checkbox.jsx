import React from 'react';
import { prependOnceListener } from 'cluster';

const Checkbox = ({type = 'checkbox', checked=true, onChange=checkHandler, index=props.index, price={}}) => {

    if(index === 0) {
        return (
            <div>
                <input type={type} checked={checked} onChange={checkHandler}/>
                <label></label>
            </div>
        )
    } else {
        return (
            <div>
                <input type={type} checked={checked} onChange={checkHandler}/>
                <label></label>
            </div>
        )
    }

}
    

export default Checkbox;