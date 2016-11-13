/// <reference path="../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Hello } from './app/hello';
import { EventComponent } from './app/events';
import { LoginControl } from './app/loginControl';
import BasicList from './app/basicList';
import Calculator from './app/calculator';
import MainPane from './app/splitPane';
import Children from './app/children';

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

const blist: ListItem[] = [
  { name: 'Name 1', value: 1, id: 10 }, 
  { name: 'Name 2', value: 2, id: 11 }, 
  { name: 'Name 3', value: 3, id: 12 }, 
  { name: 'Name 4', value: 4, id: 13 }, 
  { name: 'Name 5', value: 5, id: 14 }
];

let st = {clear: 'both'};

ReactDOM.render(
  <div>
    <div>
      <Hello />
      <Hello msg="ppp" startCount={11} />
      <Hello startCount={5} />
    </div>
    <div>
      <h2>
        User: {formatUsr(usr)}
      </h2>
    </div>

    <div>
      <EventComponent />
    </div>

    <div>
      <LoginControl isLogged={false} />
    </div>
    
    <BasicList items={blist} />
    <br />
    <Calculator />    
    <br />
    <MainPane />
    <div style={st}>
      Children: <Children>
        <span>span 1</span>
        <span>span 2</span>
        <span>span 3</span>
      </Children>
    </div>
  </div>,
  document.getElementById('root'));
