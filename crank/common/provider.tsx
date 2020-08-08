import { createElement, Context, Fragment, Children } from "@bikeshaving/crank";
import { Store } from "redux";

type ProviderProps<TStore> = {
    store: TStore,
    children: Children
};

export function *Provider<TStore extends Store>(this: Context, { store, children }: ProviderProps<TStore>) {
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
