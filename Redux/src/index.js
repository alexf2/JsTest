import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'

import {createDevTools} from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import {Hello} from './app/hello';

import './index.less'

/*let tools = createDevTools(
  <DockMonitor

    toggleVisibilityKey='ctrl-y'

    changePositionKey='ctrl-q'
    defaultIsVisible={true}
  >
    <LogMonitor theme='tomorrow' />
  </DockMonitor>
)*/

const counterAction = (state = 0, action) => {

  switch(action.type) {
    case 'INC':
      return state + 1
    case 'DEC':
      return state - 1
    default:
      return state
  }
}

const store = createStore(counterAction, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

window.store = store

const render = () => {
  ReactDOM.render(
    <div>
      <Hello count={store.getState()}
        onIncrement={() => store.dispatch({type: 'INC'})}
        onDecrement={() => store.dispatch({type: 'DEC'})} />
      {/*tools*/}
    </div>,
    document.getElementById('root')
  )
}


store.subscribe( () => render())

render()
