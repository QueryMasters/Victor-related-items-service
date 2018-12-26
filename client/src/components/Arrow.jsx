import React from 'react';

const Arrow = (props) => {
    let dirIcon;
    if (props.direction === 'left') {
        dirIcon = '<';
    } else if (props.direction === 'right') {
        dirIcon = '>';
    }
    return( 
        <button className="arrow" onClick = {() => {props.arrowClick(props.direction)}}>
            {dirIcon}
        </button>
    )
}

export default Arrow;