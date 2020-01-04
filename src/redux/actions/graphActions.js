import Joint from 'jointjs';

export function addElement(typeId, position) {
    return (dispatch, getState) => {
        const state = getState()
        const nodeType = state.nodeTypes.entities[typeId];
        let node;
        if (nodeType.type === "Goal") {
            node = new Joint.shapes.basic.Rect({
                typeId,
                position: position ? position : {x: 100, y: 100},
                size: {width: 150, height: 100},
                attrs: {
                    rect: {fill: 'rgba(0, 255, 0, 0.3)', rx: 10, ry: 10},
                    text: {text: nodeType.name + (state.graph.goalNum + 1), fill: 'white'}
                },
                refName: nodeType.name.toLowerCase() + nodeType.n.toString(),
                nodeType: "Goal",
                name: nodeType.name + nodeType.n.toString(),
                description: nodeType.description,
                isMandatory: nodeType.isMandatory,
                weights: nodeType.weights.map((weight) => {
                    return {
                        name: weight.name,
                        value: weight.value,
                    }
                })
            }).toJSON();
        } else {
            node = new Joint.shapes.basic.Circle({
                typeId,
                position: position ? position : {x: 100, y: 100},
                size: {width: 30, height: 30},
                attrs: {circle: {fill: 'black'}},
                refName: nodeType.name.toLowerCase() + nodeType.n.toString(),
                nodeType: "Refinement",
                name: nodeType.name + (state.graph.refinementNum + 1),
                weight: nodeType.weight
            }).toJSON();
        }
        dispatch({type: 'ADD_ELEMENT', element: node});
    }
}

export function selectElement(id) {
    return {type: 'SELECT_ELEMENT', id};
}

export function deselectElement() {
    return {type: 'DESELECT_ELEMENT'};
}

export function dragElement(id, x, y) {
    return (dispatch, getState) => {
        const newData = {position: {x, y}};
        dispatch({type: 'EDIT_ELEMENT', id, newData})
        const embeds = getState().graph.entities[id].embeds
        if (embeds) {
            embeds.forEach(embed => {
                dispatch({type: 'EDIT_ELEMENT', id: embed, newData: {position: {x, y: y - 20}}});
            })
        }
    }
}

export function editNodeTypeName(id, value) {
    return (dispatch, getState) => {
        const nodeType = getState().nodeTypes.entities[id];
        const currentText = nodeType.name
        const name = currentText.substr(currentText.length) + value;
        nodeType.name = name;
        dispatch({type: 'EDIT_NODE_TYPE', id, nodeType});
    }
}

export function editNodeTypeDescription(id, value) {
    return (dispatch, getState) => {
        const nodeType = getState().nodeTypes.entities[id];
        const currentText = nodeType.description;
        const description = currentText.substr(currentText.length) + value;
        nodeType.description = description;
        dispatch({type: 'EDIT_NODE_TYPE', id, nodeType});
    }
}

export function editNodeTypeMandatory(id, value) {
    return (dispatch, getState) => {
        const nodeType = getState().nodeTypes.entities[id];
        nodeType.isMandatory = value
        dispatch({type: 'EDIT_NODE_TYPE', id, nodeType});
    }
}

export function addNodeTypeWeight(id, name, value) {
    return (dispatch, getState) => {
        const nodeType = getState().nodeTypes.entities[id];
        const weights = [...nodeType.weights];
        weights.push(
            {
                name,
                value,
            }
        );
        nodeType.weights = weights;
        dispatch({type: 'EDIT_NODE_TYPE', id, nodeType});
    }
}

export function deleteNodeTypeWeight(id, variableIndex) {
    return (dispatch, getState) => {
        const nodeType = getState().nodeTypes.entities[id];
        let weights = [...nodeType.weights];
        weights = weights.slice(0, variableIndex).concat(weights.slice(variableIndex + 1, weights.length))
        nodeType.weights = weights;
        dispatch({type: 'EDIT_NODE_TYPE', id, nodeType});
    }
}


export function editElementName(id, value) {
    return (dispatch, getState) => {
        const element = getState().graph.entities[id];
        const currentText = element.name
        const name = currentText.substr(currentText.length) + value;
        const text = currentText.substr(currentText.length) + value;
        const attrs = {...element.attrs, text: {...element.attrs.text, text}}
        dispatch({type: 'EDIT_ELEMENT', id, newData: {name, attrs}});
    }
}

export function editElementDescription(id, value) {
    return (dispatch, getState) => {
        const element = getState().graph.entities[id];
        const currentText = element.description;
        const description = currentText.substr(currentText.length) + value;
        dispatch({type: 'EDIT_ELEMENT', id, newData: {description}});
    }
}

export function editElementRelationship(id, value) {
    return (dispatch) => {
        let contributionType;
        const relationship = value;
        if (value === 'PCC') {
            contributionType = '+C'
        } else if (value === 'PVC') {
            contributionType = '+V'
        } else if (value === 'NCC') {
            contributionType = '-C'
        } else if (value === 'NVC') {
            contributionType = '-V'
        } else if (value === 'EXC') {
            contributionType = 'EX'
        } else if (value === 'PRE') {
            contributionType = 'PR'
        }
        dispatch({type: 'EDIT_ELEMENT', id, newData: {relationship, contributionType}});
    }
}

export function editElementMandatory(id, value) {
    return (dispatch) => {
        dispatch({type: 'EDIT_ELEMENT', id, newData: {isMandatory: value}});
    }
}

export function editEventWeight(id, value) {
    return (dispatch) => {
        dispatch({type: 'EDIT_ELEMENT', id, newData: {weight: value}});
    }
}

export function addGoalWeight(id, name, value) {
    return (dispatch, getState) => {
        const element = getState().graph.entities[id];
        const weights = [...element.weights];
        weights.push(
            {
                name,
                value,
            }
        );
        dispatch({type: 'EDIT_ELEMENT', id, newData: {weights}});
    }
}

export function deleteGoalWeight(id, variableIndex) {
    return (dispatch, getState) => {
        const element = getState().graph.entities[id];
        let weights = [...element.weights];
        weights = weights.slice(0, variableIndex).concat(weights.slice(variableIndex + 1, weights.length))
        dispatch({type: 'EDIT_ELEMENT', id, newData: {weights}});
    }
}

export function setOrigin(x, y) {
    return {type: 'SET_ORIGIN', origin: {x, y}};
}

export function addLink(typeId, source, target) {
    return (dispatch, getState) => {
        const transition = getState().transitions.entities[typeId];
        const link = new Joint.dia.Link({
            name: transition.name,
            weight: transition.weight,
            source: {id: source},
            target: target.x ? target : {id: target},
            labels: [
                {position: 0.5}
            ],
            attrs: {
                '.marker-target': {d: 'M 10 0 L 0 5 L 10 10 z'}
            },
            typeId
        }).toJSON();
        dispatch({type: 'START_LINKING', link: link.id});
        dispatch({type: 'ADD_ELEMENT', element: link});
        dispatch(editElement(link.id));
    }
}

export function addVertex(id, x, y) {
    return (dispatch, getState) => {
        const link = getState().graph.entities[id];
        const vertices = link.vertices || [];
        const newData = {vertices: vertices.concat({x, y})}
        dispatch({type: 'EDIT_ELEMENT', id, newData});
    }
}

export function dragVertex(id, index, x, y) {
    return (dispatch, getState) => {
        const link = getState().graph.entities[id];
        const vertices = link.vertices
        const newData = {
            vertices: vertices.slice(0, index)
                .concat({x, y})
                .concat(vertices.slice(index + 1))
        }
        dispatch({type: 'EDIT_ELEMENT', id, newData});
    }
}

export function changeLinkTarget(link, newTarget) {
    return {type: 'EDIT_ELEMENT', id: link, newData: {target: {id: newTarget}}}
}

export function deleteElement(id) {
    return {type: 'DELETE_ELEMENT', id};
}

export function editElement(id) {
    return {type: 'START_EDITING', element: id};
}

export function stopEditing() {
    return {type: 'STOP_EDITING'};
}

export function stopEditingNodeType() {
    return {type: 'STOP_EDITING_NODE_TYPE'};
}

export function startEditingNodeType() {
    return {type: 'START_EDITING_NODE_TYPE'};
}

export function clearGraph() {
    return {type: 'CLEAR_GRAPH'};
}

