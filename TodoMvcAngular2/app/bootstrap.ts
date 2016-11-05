///<reference path="../node_modules/angular2/typings/es6-collections/es6-collections.d.ts"/>
///<reference path="../node_modules/angular2/typings/es6-promise/es6-promise.d.ts"/>
import {bootstrap} from 'angular2/platform/browser';
import TodoApp from './app'
import {TodoStore} from './services/store';

bootstrap(TodoApp, [TodoStore]);
