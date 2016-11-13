/// <reference path="interfaces.d.ts" />

import * as React from 'react';

const SplitPane = (props) => {
    return (
        <div className = "SplitPage">
            <div className="left">
                {props.left}
            </div>
            <div className="mid"><p>&nbsp;</p></div>
            <div className="right">
                {props.right}
            </div>
        </div>
    );    
}

const MainPane = (props) => {
    return (
        <SplitPane left={<p>Left pane</p>} right={<p>Right pane</p>} />
    );
}

export default MainPane;
