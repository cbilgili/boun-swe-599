import React from 'react';
import { connect } from 'react-redux';
import NodeEditorForm from "./NodeEditorForm";
import NodeEditorTable from "./NodeEditorTable";

import {
    editElementName,
    editElementDescription,
    editElementMandatory,
    stopEditing,
    editEventWeight,
    deselectElement,
    deleteElement,
    editElementRelationship
} from '../redux/actions/graphActions';

class NodeEditor extends React.Component {

    render() {
        if (this.props.closed) {
            return <div />
        } else {
            if (this.props.nodeType === "Goal") {
                const name = (<div>
                    <h4>Name</h4>
                    <input
                        type="text"
                        value={this.props.name}
                        onChange={(event) => {
                            this.props.editElementName(this.props.elementId, event.target.value);
                        }}
                        placeholder={this.props.name} /></div>);

                const description = (<div>
                    <h4>Description</h4>
                    <input
                        type="text"
                        value={this.props.description}
                        onChange={(event) => {
                            this.props.editElementDescription(this.props.elementId, event.target.value);
                        }}
                        placeholder={this.props.description} /></div>);

                const isMandatory = (<div>
                    <h4>Mandatory</h4>
                    <input
                        type="checkbox"
                        checked={this.props.isMandatory}
                        onChange={(event) => {
                            this.props.editElementMandatory(this.props.elementId, event.target.checked);
                        }}
                        placeholder={this.props.isMandatory} /></div>);

                return <div>
                    <div className="modal-header">
                        <h2 className="modal-title">Goal Properties</h2>
                    </div>
                    <div className="modal-body">
                        {name}
                        {description}
                        {isMandatory}
                        <NodeEditorTable />
                        <NodeEditorForm /></div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-warning" onClick={() => this.deleteNode()}>Delete
                        Goal
                        </button>
                        <button type="button" className="btn btn-success" onClick={() => this.closeNodeEditor()}>Save &amp; Close
                        </button>
                    </div>
                </div>
            } else if (this.props.nodeType === "Refinement") {
                const name = (<div>
                    <h4>Name</h4>
                    <input
                        type="text"
                        value={this.props.name}
                        onChange={(event) => {
                            this.props.editElementName(this.props.elementId, event.target.value);
                        }}
                        placeholder={this.props.name} /></div>);
                const weight = (<div>
                    <h4>Weight</h4>
                    <input
                        type="number"
                        value={this.props.weight}
                        onChange={(event) => {
                            this.props.editEventWeight(this.props.elementId, event.target.value);
                        }}
                        placeholder={this.props.weight} /></div>);

                return <div>
                    <div className="modal-header">
                        <h2 className="modal-title">Refinement Properties</h2>
                    </div>
                    <div className="modal-body">
                        {name}
                        {weight}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-warning" onClick={() => this.deleteNode()}>Delete
                        Refinement
                        </button>
                        <button type="button" className="btn btn-success" onClick={() => this.closeNodeEditor()}>Save &amp; Close
                        </button>
                    </div>
                </div>
            } else if (this.props.nodeType === "Contribution") {
                const weight = (<div>
                    <h4>Weight</h4>
                    <input
                        type="number"
                        value={this.props.weight}
                        onChange={(event) => {
                            this.props.editEventWeight(this.props.elementId, event.target.value);
                        }}
                        placeholder={this.props.weight} /></div>);

                let transitions = {}
                transitions["C+"] = "PCC";
                transitions["C-"] = "NCC";
                transitions["V+"] = "PVC";
                transitions["V-"] = "NVC";
                transitions["pre"] = "PRE";
                transitions["Exclusion"] = "EXC";

                const selectedRelationship = transitions[this.props.name];

                const relationships = (<div>
                    <h4>Relationship</h4>
                    <select className="form-control"
                        onChange={(event) => {
                            this.props.editElementRelationship(this.props.elementId, event.target.value);
                        }}
                        placeholder={this.props.relationship}
                        defaultValue={selectedRelationship}
                        disabled
                        style={{
                            height: '34px'
                        }}>
                        <option>PCC</option>
                        <option>NCC</option>
                        <option>PVC</option>
                        <option>NVC</option>
                        <option>EXC</option>
                        <option>PRE</option>
                    </select>
                </div>);

                return <div>
                    <div className="modal-header">
                        <h2 className="modal-title">Contribution Properties</h2>
                    </div>
                    <div className="modal-body">
                        {weight}
                        {relationships}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-warning" onClick={() => this.deleteNode()}>Delete
                        Event
                        </button>
                        <button type="button" className="btn btn-success" onClick={() => this.closeNodeEditor()}>Save &amp; Close
                        </button>
                    </div>
                </div>
            } else {
                return null
            }

        }
    }

    deleteNode() {
        this.props.stopEditing();
        this.props.deleteElement(this.props.elementId)
    }

    closeNodeEditor() {
        this.props.stopEditing();
        this.props.deselectElement();
    }
}

function mapStateToProps(state) {
    if (!state.editingNode) {
        return {
            closed: true
        }
    } else {
        const element = state.graph.entities[state.editingNode.id];
        if (element.nodeType === "Goal") {
            return {
                elementId: element.id,
                nodeType: element.nodeType,
                name: element.name,
                description: element.description,
                isMandatory: element.isMandatory,
                refName: element.refName,
                weight: element.weight,
            }
        } else if (element.nodeType === "Refinement") {
            return {
                elementId: element.id,
                nodeType: element.nodeType,
                name: element.name,
                weight: element.weight,
                refName: element.refName,
            }
        }

        return {
            nodeType: "Contribution",
            elementId: element.id,
            refName: element.refName,
            weight: element.weight,
            name: element.name,
            relationship: element.relationship
        }

    }
}

const mapDispatchToProps = {
    stopEditing,
    editElementName,
    editElementDescription,
    editElementMandatory,
    editEventWeight,
    deselectElement,
    deleteElement,
    editElementRelationship
}

export default connect(mapStateToProps, mapDispatchToProps)(NodeEditor);
