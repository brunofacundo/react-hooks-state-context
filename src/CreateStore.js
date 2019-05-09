export function createStore(initialState = {}, actions = {}) {
    return {
        initialState,
        actions
    };
}
