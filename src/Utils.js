export function createStore(initialState = {}, modules = {}) {
    return {
        initialState,
        modules
    };
}
