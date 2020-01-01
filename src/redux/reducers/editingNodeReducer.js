export default function editingNodeReducer(state, action) {
    switch(action.type) {
        case 'START_EDITING': {
            return { id: action.element };
        }
        case 'STOP_EDITING': {
            return null;
        }
        default: {
            return state || null;
        }
    }
}
