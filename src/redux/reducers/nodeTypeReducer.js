export default function nodeTypeReducer(state, action) {
    switch (action.type) {
        case 'ADD_ELEMENT': {
            return {
                array: state.array,
                entities: state.array.reduce((object, id) => {
                    if (id === action.element.typeId) {
                        const type = state.entities[id];
                        object[id] = Object.assign({}, type, {n: type.n + 1});
                    } else {
                        object[id] = state.entities[id]
                    }
                    return object;
                }, {})
            }
        }
        case 'EDIT_NODE_TYPE': {
            return {
                array: state.array,
                entities: state.array.reduce((object, id) => {
                    if (id === action.id) {
                        object[id] = Object.assign(action.nodeType);
                    } else {
                        object[id] = state.entities[id]
                    }
                    return object;
                }, {})
            }
        }
        case 'LOAD_DATA': {
            return action.data.nodeTypes || state;
        }
        case '@@INIT':
            return {
                array: [1, 2],
                entities: {
                    1: {
                        type: "Goal",
                        name: "G",
                        description: "",
                        isMandatory: false,
                        weights: [],
                        n: 1,
                    },
                    2: {
                        type: "Refinement",
                        name: "R",
                        weight: "",
                        n: 2
                    }
                }
            };
        default: {
            return state || null;
        }

    }
}
