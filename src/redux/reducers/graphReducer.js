export default function graphReducer(state, action) {
    switch (action.type) {
        case 'ADD_ELEMENT': {
            const array = state.array.concat(action.element.id);
            let goalNum = state.goalNum;
            let refinementNum = state.refinementNum;
            if (action.element.type === "basic.Rect") {
                goalNum = goalNum + 1;
            }
            if (action.element.type === "basic.Circle") {
                refinementNum = refinementNum + 1;
            }
            return {
                array,
                entities: array.reduce((object, id) => {
                    if (id === action.element.id) {
                        object[id] = action.element;
                    } else {
                        object[id] = state.entities[id];
                    }
                    return object;
                }, {}),
                goalNum,
                refinementNum
            }
        }
        case 'EDIT_ELEMENT': {
            const array = state.array;
            const goalNum = state.goalNum;
            const refinementNum = state.refinementNum;
            return {
                array,
                entities: array.reduce((object, id) => {
                    if (id === action.id) {
                        object[id] = Object.assign({}, state.entities[id], action.newData);
                    } else {
                        object[id] = state.entities[id];
                    }
                    return object;
                }, {}),
                goalNum,
                refinementNum
            }
        }
        case 'DELETE_ELEMENT': {
            const index = state.array.indexOf(action.id);
            const array = state.array
                .slice(0, index)
                .concat(state.array.slice(index + 1));
            const goalNum = state.goalNum;
            const refinementNum = state.refinementNum;
            return {
                array,
                entities: array.reduce((object, id) => {
                    object[id] = state.entities[id];
                    return object
                }, {}),
                goalNum,
                refinementNum
            }
        }
        case 'LOAD_DATA': {
            return action.data.graph || state;
        }
        case 'CLEAR_GRAPH': {
            const array = [];
            const entities = [];
            const goalNum = 0;
            const refinementNum = 0;
            return {
                array,
                entities,
                goalNum,
                refinementNum
            }
        }
        default:
            return state || {array: [], entities: {}, goalNum: 0, refinementNum: 0}
    }
}
