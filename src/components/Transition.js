import React from 'react';
import { connect } from 'react-redux';
import { DragSource } from 'react-dnd';

class Transition extends React.Component {
    render() {
        return this.props.connectDragSource(
            <div className="btn btn-primary btn-lg btn-block"  >
                { this.props.transitions.name }
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
