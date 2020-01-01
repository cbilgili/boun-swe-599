export default function editingNodeTypeReducer(state, action) {
    switch(action.type) {
        case 'START_EDITING_NODE_TYPE': {
            return { id: 1 };
        }
        case 'STOP_EDITING_NODE_TYPE': {
            return null;
        }
        default: {
            return state || null;
        }
    }
}
