import { createElement, Context, Fragment, Children, Component } from "@bikeshaving/crank";
import { Store, Action, Dispatch } from "redux";

declare global {
    module Crank {
        interface ProvisionMap {
            store: Store;
        }
    }
}

type ProviderProps<TState, TAction extends Action> = {
    store: Store<TState, TAction>,
    children: Children
};


// Provider component saves the store reference to the context so that it's
// globally available to all children. This is primarily intended to be used in
// combination with the "connect" function
export function *Provider<TState, TAction extends Action>(
    this: Context,
    { store, children }: ProviderProps<TState, TAction>
) {
    // save the store reference so that it's globally available
    // in all child components via this.consume("store")
    this.provide("store", store);

    while (true) {
        yield (
            <Fragment>
                {children}
            </Fragment>
        );
    }
}

// This is a naive implementation of "connect" function that will extract the store from the context
// and will provide selected dispatch functions and selected state as props to the particular
// component merged with component's own props in a fashion similar to react-redux connect function

// https://gist.github.com/gaearon/1d19088790e70ac32ea636c025ba424e
// https://crank.js.org/guides/special-props-and-tags#copy
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-redux/index.d.ts

type MapStateToPropsFunction<TStateProps, TOwnProps, TState> =
    (state: TState, ownProps: TOwnProps) => TStateProps;

type MapStateToProps<TStateProps, TOwnProps, TState> =
    MapStateToPropsFunction<TStateProps, TOwnProps, TState> | null | undefined;

type MapDispatchToProps<TDispatchProps, TOwnProps> =
    (dispatch: Dispatch<Action>, ownProps: TOwnProps) => TDispatchProps;

type ConnectedComponent<TStateProps, TDispatchProps, TOwnProps> =
    (WrappedComponent: Component<TStateProps & TDispatchProps & TOwnProps>) =>
        (this: Context, ...props: TOwnProps[]) => Generator;

export function connect<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, TState = {}>(
    mapStateToProps: MapStateToProps<TStateProps, TOwnProps, TState>,
    mapDispatchToProps: MapDispatchToProps<TDispatchProps, TOwnProps>
): ConnectedComponent<TState, TDispatchProps, TOwnProps> {
    // @Types the type of the wrapped component should be here something like
    // <TStateProps & TDispatchProps & TOwnProps>
    return (WrappedComponent: Component) => {
        return function *Wrapper(this: Context, ...props: TOwnProps[]) {
            const store = this.consume("store");

            const unsubscribe = store.subscribe(() => {
                this.refresh();
            });

            try {
                while (true) {
                    const ownProps = props[0];
                    const stateProps = mapStateToProps
                        ? mapStateToProps(store.getState(), ownProps)
                        : undefined;
                    const dispatchProps = mapDispatchToProps
                        ? mapDispatchToProps(store.dispatch, ownProps)
                        : undefined;

                    yield (
                        <WrappedComponent
                            { ...ownProps }
                            { ...stateProps }
                            { ...dispatchProps }
                        />
                    );
                }
            } finally {
                unsubscribe();
            }
        }
    };
}
