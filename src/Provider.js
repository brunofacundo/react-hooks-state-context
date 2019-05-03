import React, { createContext, PureComponent, useContext, useMemo } from 'react';

const Context = createContext();

export class Provider extends PureComponent {
    constructor(props) {
        super(props);

        const { store } = props;
        const { modules } = store;

        this.state = store.initialState;
        this.actions = modules;

        for (let actions of Object.values(modules)) {
            for (let [actionName, actionFunc] of Object.entries(actions)) {
                actions[actionName] = (...params) =>
                    actionFunc(
                        this.state,
                        state => {
                            return new Promise(resolve => {
                                this.setState(state, () => {
                                    resolve(this.state);
                                });
                            });
                        },
                        ...params
                    );
            }
        }
    }

    render() {
        const { children } = this.props;

        return <Context.Provider value={{ state: this.state, actions: this.actions }}>{children}</Context.Provider>;
    }
}

export function connect(Component, funcDeps) {
    return function(props) {
        const { state, actions } = useContext(Context);

        let deps = [];
        if (funcDeps != null) {
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
