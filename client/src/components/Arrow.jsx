import React from 'react';

const Arrow = (props) => {
    let dirIcon;
    if (props.direction === 'left') {
        dirIcon = '<';
    } else if (props.direction === 'right') {
        dirIcon = '>';
    }
    return( 
        <div onClick = {() => {props.arrowClick(props.direction)}}>
            {dirIcon}
        </div>
    )
}

export default Arrow;