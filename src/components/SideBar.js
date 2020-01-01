import React from 'react';
import {connect} from 'react-redux';

import NodeType from './NodeType';
import Transition from "./Transition";

import {saveFile, loadFile} from '../redux/actions/fileActions';

class SideBar extends React.Component {
    render() {
        const nodeTypes = this.props.nodeTypes.map((id, i) => <NodeType key={i} id={id}/>);
        const transitionTypes = this.props.transitions.map((id, i) => <Transition key={i} id={id}/>);
        return (
            <div className="col-md-2">
                <div className="page-header">
                    <h1>NH Release Tool</h1>
                </div>
                <div>
                    <h3>Nodes</h3>
                    {nodeTypes}
                </div>
                <div>
                    <h3>Transitions</h3>
                    {transitionTypes}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const nodeTypes = state.nodeTypes.array;
    const transitions= state.transitions.array;
    return {
        nodeTypes,
        transitions,
    };
}

const mapDispatchToProps = {
    saveFile,
    loadFile,
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
