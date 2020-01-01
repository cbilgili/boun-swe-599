import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';

import nodeTypes from "../reducers/nodeTypeReducer";
import graph from "../reducers/graphReducer";
import paper from "../reducers/paperReducer";
import selectedNode from "../reducers/selectedNodeReducer";
import origin from '../reducers/originReducer';
import editingNode from '../reducers/editingNodeReducer'
import editingNodeType from "../reducers/editingNodeTypeReducer";
import transitions from '../reducers/transitionReducer';

export default function configureStore(initialState) {

    const reducers = combineReducers({
        graph,
        paper,
        origin,
        nodeTypes,
        transitions,
        selectedNode,
        editingNodeType,
        editingNode
    });

    return createStore(
        reducers,
        compose(
            applyMiddleware(thunk),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    )
}
