import produce, { Draft } from 'immer';

const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

export enum VisibilityFilterType {
    SHOW_ALL = 'SHOW_ALL',
    SHOW_COMPLETED = 'SHOW_COMPLETED',
    SHOW_ACTIVE = 'SHOW_ACTIVE'
}

interface AddTodoAction {
    type: typeof ADD_TODO;
    text: string;
}

export function addTodo(text: string): AddTodoAction {
    return { type: ADD_TODO, text };
}

interface ToggleTodoAction {
    type: typeof TOGGLE_TODO;
    index: number
};

export function toggleTodo(index: number): ToggleTodoAction {
    return { type: TOGGLE_TODO, index };
}

interface SetVisibilityFilterAction {
    type: typeof SET_VISIBILITY_FILTER;
    filter: VisibilityFilterType;
}

export function setVisibilityFilter(filter: VisibilityFilterType): SetVisibilityFilterAction {
    return { type: SET_VISIBILITY_FILTER, filter };
}

export type TodoAction = AddTodoAction | ToggleTodoAction | SetVisibilityFilterAction;

export interface Todo {
    readonly text: string;
    readonly completed: boolean;
}

export interface TodoAppState {
    readonly visibilityFilter: VisibilityFilterType;
    readonly todos: ReadonlyArray<Todo>;
}

export const todos = produce((draft: Draft<TodoAppState>, action: TodoAction) => {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            draft.visibilityFilter = action.filter;
            return;
        case ADD_TODO:
            draft.todos.push({
                completed: false,
                text: action.text
            });
            return;
        case TOGGLE_TODO:
            draft.todos[action.index].completed = !draft.todos[action.index].completed;
            return;
    }
}, {
    visibilityFilter: VisibilityFilterType.SHOW_ALL,
    todos: []
});
