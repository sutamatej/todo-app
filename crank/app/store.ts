import { Store, createStore, applyMiddleware } from 'redux';
import { TodoAppState, todos, TodoAction } from '../features/todos';
import { logger } from '../common/logger';

export type TodoStore = Store<TodoAppState, TodoAction>;

export function makeStore(initState?: TodoAppState) {
    const store = createStore<TodoAppState, TodoAction, {}, {}>(todos, initState, applyMiddleware(logger));
    return store;
}