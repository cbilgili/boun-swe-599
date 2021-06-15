import React from 'react';
import {connect} from 'react-redux';
import Modal from 'react-modal';

import Graph from "./Graph";
import NodeEditor from "./NodeEditor";
import NodeTypeEditor from "./NodeTypeEditor";
import {stopEditing, stopEditingNodeType} from "../redux/actions/graphActions";


class GraphContainer extends React.Component {
    render() {
        return <div className="col-md-10">
            <Graph/>
            <Modal isOpen={!!this.props.editingNode} onRequestClose={this.props.stopEditing} style={{
                content: {
                    width: '50%',
                    height: '50%',
                    top: '10%',
                    left: '25%'
                }
            }}>
                <NodeEditor/>
            </Modal>
            <Modal isOpen={!!this.props.editingNodeType} onRequestClose={this.props.stopEditingNodeType} style={{
                content: {
                    width: '50%',
                    height: '50%',
                    top: '10%',
                    left: '25%'
                }
            }}>
                <NodeTypeEditor/>
            </Modal>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        editingNode: state.editingNode,
        editingNodeType: state.editingNodeType
    };
}

const mapDispatchToProps = {
    stopEditing,
    stopEditingNodeType
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphContainer);
