import { createElement, Element, Context } from "@bikeshaving/crank";
import { VisibilityFilterType, TodoAppState, toggleTodo } from './todos';

function getVisibleTodos(state: TodoAppState) {
    switch (state.visibilityFilter) {
        case VisibilityFilterType.SHOW_ACTIVE:
            return state.todos.filter(todo => !todo.completed);
        case VisibilityFilterType.SHOW_COMPLETED:
            return state.todos.filter(todo => todo.completed);
        case VisibilityFilterType.SHOW_ALL:
            return state.todos;
    }
}

export function TodoList(this: Context): Element {
    const store = this.consume("store");
    const state = store.getState();
    const todos = getVisibleTodos(state);
    return (
        <ul>
            {todos.map((todo, index) => (
                <li
                    key={index}
                    onclick={() => {
                        store.dispatch(toggleTodo(index));
                    }}
                    style={{'text-decoration': todo.completed ? 'line-through' : 'none'}}
                >
                    {todo.text}
                </li>
            ))}
        </ul>
    );
}