import { createElement, Element } from "@bikeshaving/crank";
import { setVisibilityFilter, VisibilityFilterType } from './todos';
import { connect } from '../../common/provider';

interface TodoFilterProps {
    readonly setVisibilityFilter: (filter: VisibilityFilterType) => void;
}

function TodoFilter(props: TodoFilterProps): Element {
    return (
        <div>
            <button onclick={() => props.setVisibilityFilter(VisibilityFilterType.SHOW_ALL)}>All</button>
            <button onclick={() => props.setVisibilityFilter(VisibilityFilterType.SHOW_ACTIVE)}>Active</button>
            <button onclick={() => props.setVisibilityFilter(VisibilityFilterType.SHOW_COMPLETED)}>Completed</button>
        </div>
    );
}

export const ConnectedTodoFilter = connect<TodoFilterProps>(
    null,
    (dispatch) => ({
        setVisibilityFilter: (filter: VisibilityFilterType) => dispatch(setVisibilityFilter(filter))
    })
)(TodoFilter);
