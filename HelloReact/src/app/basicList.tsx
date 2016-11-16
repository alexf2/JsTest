/// <reference path="interfaces.d.ts" />

import * as React from 'react';

function ListItem(props: ListItem) {
    return (
        <li id={props.value}>
            {props.name}- {props.value}
        </li>
    );
}

const Button = (props) => {
    return (
        <button onClick={props.onClick}>{props.text}</button>
    );
}

class NList extends React.Component<IListProps, IListProps> {

    constructor(props) {
        super(props);

        this.state = { items: props.items.slice() };
    }

    handleClick = (e) => {
        this.setState((oldS, oldP) => {
            // let o = oldS.items.slice();
            let o = oldS.items;
            let idx = Math.round(Math.random() * (o.length - 1));

            o[idx].value++;

            return { items: o };
        });

        // this.forceUpdate();    
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.items.map((i) =>
                        <ListItem key={i.id.toString()} name={i.name} value={i.value} />
                    )}
                </ul>
                <Button text={'Update random'} onClick={this.handleClick} />
            </div>);
    }
}

export default NList;
