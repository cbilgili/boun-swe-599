import React from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';
import { getTransitionIcon } from '../utils/icons';

class Transition extends React.Component {
    render() {
        return this.props.connectDragSource(
            <div className="btn-block text-center pb-4">
                <div>{getTransitionIcon(this.props.transitions.name)}</div> 
                <div className="font-weight-bold">{this.props.transitions.name}</div>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    const transitions = state.transitions.entities[props.id];
    return {
        transitions,
    };
}

const spec = {
    beginDrag(props) {
        return {
            id: props.id,
        }
    }
};

function collect(connect, monitor) {
  return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    }
}

export default connect(mapStateToProps)(DragSource('transition', spec, collect)(Transition));
