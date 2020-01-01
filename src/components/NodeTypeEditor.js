import React from 'react';
import {connect} from 'react-redux';

import NodeTypeEditorTable from "./NodeTypeEditorTable";
import NodeTypeEditorForm from "./NodeTypeEditorForm";
import {
    editNodeTypeDescription,
    stopEditingNodeType,
    editNodeTypeName,
    editNodeTypeMandatory
} from '../redux/actions/graphActions';

class NodeTypeEditor extends React.Component {

    render() {
        if (this.props.closed) {
            return <div/>
        } else {
            const name = (<div>
                <h4>Name</h4>
                <input
                    type="text"
                    value={this.props.name}
                    onChange={(event) => {
                        this.props.editNodeTypeName(this.props.elementId, event.target.value);
                    }}
                    placeholder={this.props.name}/></div>);

            const description = (<div>
                <h4>Description</h4>
                <input
                    type="text"
                    value={this.props.description}
                    onChange={(event) => {
                        this.props.editNodeTypeDescription(this.props.elementId, event.target.value);
                    }}
                    placeholder={this.props.description}/></div>);

            const isMandatory = (<div>
                <h4>Mandatory</h4>
                <input
                    type="checkbox"
                    checked={this.props.isMandatory}
                    onChange={(event) => {
                        this.props.editNodeTypeMandatory(this.props.elementId, event.target.checked);
                    }}
                    placeholder={this.props.isMandatory}/></div>);

            return <div>
                <div className="modal-header">
                    <h2 className="modal-title">Goal Properties</h2>
                </div>
                <div class="modal-body">
                    {name}
                    {description}
                    {isMandatory}
                    <NodeTypeEditorTable/>
                    <NodeTypeEditorForm/>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={() => this.closeNodeEditor()}>Close
                    </button>
                </div>
            </div>

        }
    }

    closeNodeEditor() {
        this.props.stopEditingNodeType();
    }
}

function mapStateToProps(state) {
    if (!state.editingNodeType) {
        return {
            closed: true
        }
    } else {
        const element = state.nodeTypes.entities[state.editingNodeType.id];
        return {
            elementId: 1,
            type: element.type,
            name: element.name,
            description: element.description,
            isMandatory: element.isMandatory,
            weights: element.weights,
        }
    }
}

const mapDispatchToProps = {
    editNodeTypeName,
    editNodeTypeDescription,
    editNodeTypeMandatory,
    stopEditingNodeType
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeTypeEditor);
