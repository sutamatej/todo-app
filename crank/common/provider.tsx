import { createElement, Context, Fragment, Children, Component } from "@bikeshaving/crank";
import { Store, Action, Dispatch, AnyAction } from "redux";

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
    // save the reference to the store so that it's globally available
    // in all child components via this.get("store")
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

type MapStateToProps<TState, TProps, TOwnProps> = (state: TState, props: TProps) => Partial<TOwnProps> | void;
type MapDispatchToProps<TProps, TOwnProps> = (dispatch: Dispatch<AnyAction>, props: TProps) => Partial<TOwnProps> | void;

export function connect<TState, TOwnProps, TProps>(
    mapStateToProps: MapStateToProps<TState, TProps, TOwnProps>,
    mapDispatchToProps: MapDispatchToProps<TProps, TOwnProps>
) {
    return (WrappedComponent: Component) => {
        return function *Wrapper(this: Context, { props }: { props?: any }) {
            const store = this.consume("store");
        
            const unsubscribe = store.subscribe(() => {
                this.refresh();
            });
        
            try {
                while (true) {
                    yield (
                        <WrappedComponent
                            { ...props }
                            { ...mapStateToProps(store.getState(), props) }
                            { ...mapDispatchToProps(store.dispatch, props) }
                        />
                    );
                }
            } finally {
                unsubscribe();
            }
        }
    }
}
