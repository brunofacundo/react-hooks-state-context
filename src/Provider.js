import React, { createContext, useState } from 'react';

export const Context = createContext();

export default function Provider({ children, store }) {
    const { initialState, actions } = store;
    const [state, setState] = useState(initialState);

    for (let [name, func] of Object.entries(actions)) {
        actions[name] = (...params) => func(state, setState, ...params);
    }

    return <Context.Provider value={{ state, actions }}>{children}</Context.Provider>;
}
