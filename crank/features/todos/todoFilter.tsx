import { createElement, Element, Context } from "@bikeshaving/crank";
import { setVisibilityFilter, VisibilityFilterType } from './todos';

export function TodoFilter(this: Context): Element {
    const store = this.consume("store");
    
    return (
        <div>
            <button onclick={() => store.dispatch(setVisibilityFilter(VisibilityFilterType.SHOW_ALL))}>All</button>
            <button onclick={() => store.dispatch(setVisibilityFilter(VisibilityFilterType.SHOW_ACTIVE))}>Active</button>
            <button onclick={() => store.dispatch(setVisibilityFilter(VisibilityFilterType.SHOW_COMPLETED))}>Completed</button>
        </div>
    );
}