import { Middleware } from 'redux';

// an example of a redux middleware, it does just simple logging of
// actions being passed through the store
export const logger: Middleware = store => next => action => {
    console.log('dispatching', action);
    const result = next(action);
    console.log('next state', store.getState());
    return result;
}