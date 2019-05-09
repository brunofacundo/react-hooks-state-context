import React, { createContext, PureComponent, useContext, useMemo } from 'react';

const Context = createContext();

export class Provider extends PureComponent {
    constructor(props) {
        super(props);

        const { store } = props;

        this.state = store.initialState;
        this.actions = store.actions;

        this.createActions();
    }

    createActions() {
        for (let [key, subModule] of Object.entries(this.actions)) {
            if (typeof subModule == 'function') {
                this.actions[key] = this.createAction(subModule);
            } else {
                for (let [actionName, actionFunc] of Object.entries(subModule)) {
                    subModule[actionName] = this.createAction(actionFunc);
                }
            }
        }
    }

    createAction(callback) {
        const getState = () => {
            return this.state;
        };

        const setState = state => {
            return new Promise(resolve => {
                this.setState(state, () => {
                    resolve(this.state);
                });
            });
        };

        return (...params) => {
            return callback(getState, setState, ...params);
        };
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
