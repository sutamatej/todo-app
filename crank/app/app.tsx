import { createElement, Element } from "@bikeshaving/crank";
import { TodoStore } from './store';
import { AddTodo, TodoList, TodoFilter } from '../features/todos';
import { Provider } from '../common/provider';

declare global {
    module Crank {
        interface ProvisionMap {
            store: TodoStore;
        }
    }
}

export function App({ store }: { store: TodoStore}): Element {
    return (
        <Provider store={store}>
            <div class='container'>
                <AddTodo />
                <TodoList />
                <TodoFilter />
            </div>
        </Provider>
    );
}