import { createElement, Context, Fragment, Children } from "@bikeshaving/crank";
import { Store, Action } from "redux";

type ProviderProps<TState, TAction extends Action> = {
    store: Store<TState, TAction>,
    children: Children
};

export function *Provider<TState, TAction extends Action>(this: Context, { store, children }: ProviderProps<TState, TAction>) {
    const unsubscribe = store.subscribe(() => {
        this.refresh();
    });

    // save the reference to the store so that it's globally available
    // in all child components via this.get("store")
    this.provide("store", store);

    try {
        while (true) {
            yield (
                <Fragment>
                    {children}
                </Fragment>
            );
        }
    } finally {
        unsubscribe();
    }
}

// @Incomplete - create a connect function that will extract the store from the context
// and will provide selected dispatch functions and selected state as props to the particular
// component merged with component's own props in a fashion similar to react-redux connect function
