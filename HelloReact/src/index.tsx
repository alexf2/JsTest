/// <reference path="../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Hello } from './app/hello';

import './index.less';

class UserData {
  constructor(private _name: string, private _surname: string) {
  }

  get name(): string { return this._name; }
  get surname(): string { return this._surname; }
};

const usr: UserData = new UserData('Paul', 'Watts');

function formatUsr(u?: UserData) {
    return u ? `${u.name} ${u.surname}` : "<null>";
}

ReactDOM.render(
  <div>
    <div>
      <Hello />
      <Hello msg="ppp" startCount = {11} />
      <Hello  startCount = {5} />
    </div>
    <div>
      <h2>
        User: {formatUsr(usr)}
      </h2>
    </div>
  </div>,
  document.getElementById('root'));

