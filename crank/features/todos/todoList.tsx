import { createElement, Element } from "@bikeshaving/crank";
import { connect } from "../../common/provider";
import { VisibilityFilterType, TodoAppState, toggleTodo, Todo } from './todos';

function getVisibleTodos(todos: ReadonlyArray<Todo>, filter: VisibilityFilterType) {
    switch (filter) {
        case VisibilityFilterType.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed);
        case VisibilityFilterType.SHOW_COMPLETED:
            return todos.filter(todo => todo.completed);
        case VisibilityFilterType.SHOW_ALL:
            return todos;
    }
}

interface TodoListProps {
    readonly todos: ReadonlyArray<Todo>;
    readonly visibilityFilter: VisibilityFilterType;
    readonly toggleTodo: (index: number) => void;
}

function TodoList(props: TodoListProps): Element {
    const todos = getVisibleTodos(props.todos, props.visibilityFilter);
    return (
        <ul>
            {todos.map((todo, index) => (
                <li
                    key={index}
                    onclick={() => {
                        props.toggleTodo(index);
                    }}
                    style={{'text-decoration': todo.completed ? 'line-through' : 'none'}}
                >
                    {todo.text}
                </li>
            ))}
        </ul>
    );
}

export const ConnectedTodoList = connect<TodoAppState, TodoListProps, {}>(
    (state) => ({
        todos: state.todos,
        visibilityFilter: state.visibilityFilter
    }),
    (dispatch, _) => ({
        toggleTodo: (index) => dispatch(toggleTodo(index))
    })
)(TodoList);
