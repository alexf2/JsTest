/// <reference path="interfaces.d.ts" />

import * as React from 'react';

const Children = (props) => {
    let rows = [];
    for(let key of Object.keys(props.children)) {
                rows.push(<div>&nbsp;&nbsp;&nbsp;{key}&nbsp;=&nbsp;{props.children[key]}</div>);
            }

    return (<div>{rows}</div>);
}

export default Children;