/// <reference path="interfaces.d.ts" />

import * as React from 'react';

export class Hello extends React.Component<IHelloProps, IHelloState> {

  private _timerID: number;

  constructor (props?:IHelloProps) {
    super(props);

    this.state = {count: props!.startCount || 0};
    this._timerID = -1;
  }

  private startTick(sta: boolean): void {
    this.clearTimer();
    if (sta)
      this._timerID = setInterval( () => this.tick(), 2000 );
  }

  private clearTimer(): void {
    if (this._timerID !== -1)
      clearInterval(this._timerID), this._timerID = -1;
  }

  private tick(): void {
    this.setState( (prevState, props) => ({count: prevState.count + 1}) );
  }

  protected componentDidMount() {
    this.startTick(true);
  }

  protected componentWillUnmount() {
    this.startTick(false);
  }

  render() {
    return (
      <h1>Count = {this.state.count}, {this.props.msg}</h1>
    );
  }
}
