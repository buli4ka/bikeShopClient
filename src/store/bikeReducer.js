
export const preloadedState = {
    config: {
        protocol: window.SERVER_PROTOCOL,
        scheme: window.SERVER_SCHEME,
        host: window.SERVER_HOST,
        pathBase: window.SERVER_PATH_BASE
    }
};

export const bikeReducer = (state = preloadedState, action) => {
    switch (action.type) {
        case "ADD_POST":
            // const todo = {text: action.payload.text, id: uuidv4(), selected: false}
            // const todos = [...state.todos, todo]
            // return {
            //     ...state, todos
            // };
        case "DELETE_POST":
            // return {
            //     ...state,
            //     todos: state.todos.filter((todo) => todo.id !== action.payload.id)
            // }
        case "EDIT_POST":
            // // let a = state.todos.find(todo=>todo.id === action.payload.id)
            // console.log(state)

        default:
            return state
    }
}
export const todosSelector = state => state.bikes
