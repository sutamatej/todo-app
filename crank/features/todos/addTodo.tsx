import { createElement, Element } from "@bikeshaving/crank";
import { connect } from "../../common/provider";
import { addTodo } from './todos';

interface AddTodoProps {
    readonly addTodo: (text: string) => void;
}

function AddTodo(props: AddTodoProps): Element {
    let todoText: string = '';

    return (
        <form onsubmit={(e: Event) => {
            e.preventDefault();
            if (todoText) {
                props.addTodo(todoText);
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
                        }}
                    />
                </div>
                <div class='four columns'>
                    <button class='button-primary' type="submit">Add Todo</button>
                </div>
            </div>
        </form>
    );
}

export const ConnectedAddTodo = connect<AddTodoProps>(
    null,
    (dispatch) => ({
        addTodo: (text: string) => dispatch(addTodo(text))
    })
)(AddTodo);
