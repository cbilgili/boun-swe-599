export default function originReducer(state, action) {
    switch(action.type) {
        case 'SET_ORIGIN':
            return {
                x: action.x,
                y: action.y
            }
        case 'LOAD_DATA': {
            return action.data.origin || state;
        }
        default: 
            return state || { x: 100, y: 100 }
    }
}
