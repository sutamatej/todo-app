import { createElement, Element } from "@bikeshaving/crank";
import { TodoStore } from './store';
import { AddTodo, TodoList, TodoFilter } from '../features/todos';
import { Provider } from '../common/provider';

// @Convention the App and Provider components should be probably flipped so
// that we have 
// <Provider store={store}>
//     <App />
// </Provider>
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
