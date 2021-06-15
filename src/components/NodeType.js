import React from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import { editType } from '../redux/actions/typeEditorActions';

class NodeType extends React.Component {
    render() {
        return this.props.connectDragSource(
            <div className="btn-block" onClick={this.onClick.bind(this)}>
                <svg width="121" height="52" viewBox="0 0 121 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="120" height="51" rx="14.5" fill="#A0E2A3" stroke="black" />
                </svg>
                {this.props.nodeType.type}
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
