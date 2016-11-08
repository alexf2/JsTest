/// <reference path="interfaces.d.ts" />

import * as React from 'react';

export class EventComponent extends React.Component<IEvProps, IEvState> {
    constructor (props?: IEvProps) {
        super(props);

        this.state =  {isOn: false};
    }

    handleClick = () => {
        this.setState( prevState => ({isOn: !prevState.isOn}));
    }

    render() {
        return (
            <button id={'xxx'}  onClick = {this.handleClick} type='button'>
                {this.state.isOn ? 'On':'Off'}
            </button>
        );
    }
}