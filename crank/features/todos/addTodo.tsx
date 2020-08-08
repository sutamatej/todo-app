import { createElement, Element, Context } from "@bikeshaving/crank";
import { addTodo } from './todos';

export function AddTodo(this: Context): Element {
    let todoText: string = '';
    const store = this.consume("store");

    return (
        <form onsubmit={(e: Event) => {
            e.preventDefault();
            if (todoText) {
                store.dispatch(addTodo(todoText));
                todoText = '';
            }
        }}>
            <div class='row'>
                <div class='eight columns'>
                    <input
                        class='u-full-width'
                        type='text'
                        value={todoText} onchange={(e: Event) => {
                            todoText = (e.currentTarget as HTMLInputElement).value;
                    }} />
                </div>
                <div class='four columns'>
                    <button class='button-primary' type="submit">Add Todo</button>
                </div>
            </div>
        </form>
    );
}
