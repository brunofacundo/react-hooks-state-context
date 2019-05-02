import { createContext, useContext, useMemo } from 'react';

export const Context = createContext();

export function createStore(initialState = {}, actions = {}) {
    return {
        initialState,
        actions
    };
}

export function connect(Component, funcDeps) {
    return function(props) {
        const { state, actions } = useContext(Context);

        let deps = [];
        if (deps != null) {
            deps = funcDeps(state);
        }

        return useMemo(() => {
            return (
                <Component {...props} state={state} actions={actions}>
                    {props.children}
                </Component>
            );
        }, deps);
    };
}
