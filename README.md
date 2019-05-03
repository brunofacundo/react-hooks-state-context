# react-hooks-state-context

# Installing

```bash
yarn add react-hooks-state-context
```

or

```bash
npm install react-hooks-state-context
```

# Usage

## Create store.

```js
import { createStore } from 'react-hooks-state-context';

const initialState = {
    user: {
        name: '',
        age: 0
    },
    loading: {
        opened: false,
        message: ''
    }
};

const actions = {
    user: {
        setName: (state, setState, name) => {
            setState({
                user: {
                    name
                }
            });
        },
        setInfo: (state, setState, name, age) => {
            setState({
                user: {
                    name,
                    age
                }
            });
        }
    },
    loading: {
        show: (state, setState) => {
            setState({
                loading: {
                    opened: true
                }
            });
        },
        hide: (state, setState) => {
            setState({
                loading: {
                    opened: false
                }
            });
        }
    }
};

export default createStore(initialState, actions);
```

## Add provider.

```js
import React, { Fragment } from 'react';
import Loading from './Loading';
import UserInfo from './UserInfo';
import store from './store';
import { Provider } from 'react-hooks-state-context';

export default function App() {
    return (
        <Provider store={store}>
            <Fragment>
                <Loading />
                <UserInfo />
                {/* Other components */}
            </Fragment>
        </Provider>
    );
}
```

## Connect component

```js
import React from 'react';
import { connect } from 'react-hooks-state-context';

function Loading({ state }) {
    if (state.loading.opened) {
        return <div>Loading...</div>;
    } else {
        return null;
    }
}

export default connect(
    Loading,
    state => [state.loading]
);
```

## Call actions

```js
import React from 'react';
import Api from './Api';
import { connect } from 'react-hooks-state-context';

function UserInfo({ state, actions }) {
    if (state.user.name == '') {
        actions.loading.show();
        Api.getUserInfo().then(userInfo => {
            actions.user.setUserInfo(userInfo.name, userInfo.age);
            actions.loading.hide();
        });
    }

    return (
        <div>
            <span>Name: {state.user.name}</span>
            <span>Age:{state.user.age}</span>
        </div>
    );
}

export default connect(
    UserInfo,
    state => [state.user]
);
```

## Docs

| Function                            | Descrption                                                                                                                                                                                                                                                              |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| createStore(initialState, actions); | **initialState**: Object with the initial state. <br><br> **actions**: Object with all actions functions, separate per modules.                                                                                                                                         |
| connect(Component, funcDeps);       | **Component**: Component to be connected. <br><br> **funcDeps**: Properties of the global state that when altered will re-render the component. It must be a function that receives the state as argument and return a array with the properties that must be listened. |
