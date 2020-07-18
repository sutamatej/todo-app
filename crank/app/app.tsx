import { createElement, Element } from "@bikeshaving/crank";
import { TodoStore } from './store';
import { AddTodo, TodoList, TodoFilter } from '../features/todos';
import { Provider } from '../common/provider';


export function App({ store }: { store: TodoStore}): Element {
    // setStore(store);

    // @Incomplete should the Provider component wrap the whole application?
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