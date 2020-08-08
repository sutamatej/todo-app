import { createElement, Element, Context } from "@bikeshaving/crank";
// import { dispatch } from '../../common/provider';
import { setVisibilityFilter, VisibilityFilterType } from './todos';
import { TodoStore } from "../../app/store";

export function TodoFilter(this: Context): Element {
    const store: TodoStore = this.consume("store");
    
    return (
        <div>
            <button onclick={() => store.dispatch(setVisibilityFilter(VisibilityFilterType.SHOW_ALL))}>All</button>
            <button onclick={() => store.dispatch(setVisibilityFilter(VisibilityFilterType.SHOW_ACTIVE))}>Active</button>
            <button onclick={() => store.dispatch(setVisibilityFilter(VisibilityFilterType.SHOW_COMPLETED))}>Completed</button>
        </div>
    );
}