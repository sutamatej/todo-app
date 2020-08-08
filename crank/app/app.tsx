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
        // @Robustness is it possible to get rid of this ugly cast to any?
        <Provider store={store as any}>
            <div class='container'>
                <AddTodo />
                <TodoList />
                <TodoFilter />
            </div>
        </Provider>
    );
}