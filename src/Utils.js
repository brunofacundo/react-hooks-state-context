import { useContext, useMemo } from 'react';
import { Context } from './Provider';

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
            props = { ...props, ...state };
            return (
                <Component {...props} actions={actions}>
                    {props.children}
                </Component>
            );
        }, deps);
    };
}
