import { createElement, Element } from "@bikeshaving/crank";
import { renderer } from "@bikeshaving/crank/dom";
import './styles/styles.css';
import { App } from './app/app';
import { makeStore, TodoStore } from './app/store';

// @Incomplete immer should probably be initialized here as well with
// all the relevant options, for more info check out enabling of individual plugins:
// https://immerjs.github.io/immer/docs/installation 

let store = makeStore();
const root = document.body;

const render = (AppComponent: ({store}: {store: TodoStore}) => Element, store: TodoStore) => {
    renderer.render(<AppComponent store={store}/>, root);
}

render(App, store);

// Enable hot module replacement
// https://webpack.js.org/guides/hot-module-replacement/
// @Build this shouldn't be included in prod package
if ((module as any).hot) {
    (module as any).hot.accept(['./app/app', './app/store'], () => {
        // Either 'App' or 'makeStore' or one of their dependencies has been updated
        // so fetch fresh versions of those
        // Styles get replaced automatically by the mini-css-extract-plugin loader, see
        // the loader options section in webpack config file
        const NewApp = require('./app/app').App;
        const newMakeStore = require('./app/store').makeStore;

        // preserve the application state:
        // 1. get the old state from the 'store' reference
        // 2. create a new store with the old state as initial state and save the reference to 'store'
        // 3. render the new application with the new store with old state preserved
        const oldState = store.getState();
        store = newMakeStore(oldState);        
        render(NewApp, store);
    });
}
