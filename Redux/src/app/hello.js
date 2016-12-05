import React, {Component} from 'react'


export class Hello extends Component {

  render() {
    return (
      <div>
        <h1>'Hello world: {this.props.count} !'</h1>
        <button name = 'inc' onClick={this.props.onIncrement} >Inc</button>
        <button name = 'dec' onClick={this.props.onDecrement} >Dec</button>
      </div>
    );
  }
}
