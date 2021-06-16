import React from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import { editType } from '../redux/actions/typeEditorActions';
import { getNodeIcon } from '../utils/icons';

class NodeType extends React.Component {
    render() {
        return this.props.connectDragSource(
            <div className="btn-block text-center pb-4" onClick={this.onClick.bind(this)}>
                <div>{getNodeIcon(this.props.nodeType.type)}</div> 
                <div className="font-weight-bold">{this.props.nodeType.type}</div>
            </div>
        )
    }

    onClick() {
        this.props.editType(this.props.id)
    }
}

function mapStateToProps(state, props) {
    const nodeType = state.nodeTypes.entities[props.id];
    return {
        nodeType,
    };
}

const mapDispatchToProps = {
    editType,
}

const spec = {
    beginDrag(props) {
        return {
            name: props.nodeType.name,
            id: props.id,
        };
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DragSource('node', spec, collect)(NodeType));
