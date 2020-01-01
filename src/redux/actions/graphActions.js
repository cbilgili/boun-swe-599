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

export function smtSolve() {
    let optimization = ` ;;%%\r\n;;Optimization:\r\n;;%%\r\n(maximize (+ NCC PVC))\r\n(maximize (+ pen.auto ben.auto))\r\n(minimize unsat_requirements)\r\n(check-sat)\r\n(load-objective-model 0)\r\n(get-model)\r\n(exit)\r\n`;
    let preference = `;;%%\r\n;;Preference:\r\n`;
    let scheme = ''

    return (dispatch, getState) => {
        let funs = [];
        let goals = [];
        let targets = [];
        let sources = [];
        let refinements = [];
        let nodes = [];
        let mandatoryGoals = [];
        let contributions = [];
        let i = 1;
        let j = 1;
        let k = 1;

        const entities = getState().graph.array;

        entities.forEach((entityId) => {

            const entity = getState().graph.entities[entityId];

            if (entity.type === 'basic.Rect') {
                let goal = entity;
                funs.push(goal.name);
                goals.push(goal);
                if (goal.isMandatory === true) {
                    mandatoryGoals.push(goal);
                }
                i++;
            } else if (entity.type === 'basic.Circle') {
                let event = entity;
                funs.push(event.name);
                refinements.push(event);
                j++;
            } else {
                let link = entity;
                goals.forEach((goal) => {
                    if (link.target.id === goal.id) {
                        targets.push(link.target.id);
                    }
                });
                link.name = `CCR${k}`;
                contributions.push(link)
                k += 1;
                refinements.forEach((ref) => {
                    if (link.source.id === ref.id) {
                        sources.push(link.source.id);
                    }
                });

                nodes.push({id: link.id, from: link.source.id, to: link.target.id});
            }
        });

        funs.sort();

        // SMT output start
        let smtOutput = '';
        smtOutput += `;; activate model generation\r\n(set-option :produce-models true)\r\n(set-option :opt.priority lex)\r\n`

        // Declaration of Goal, Assumption and Refinement Propositions
        smtOutput += `;;%%%%\r\n;Declaration of Goal, Assumption and Refinement Propositions\r\n;%%%%\r\n`;

        funs.forEach((fun) => {
            smtOutput += `(declare-fun ${fun} () Bool) \r\n`;
        });

        contributions.forEach((c) => {
            if (c.relationship !== 'EXC' && c.relationship !== 'PRE') {
                smtOutput += `(declare-fun ${c.name} () Bool) \r\n`;
            }
        });

        smtOutput += `\r\n\r\n`;

        // Close-world

        smtOutput += `;;%%%%\r\n;Close-world\r\n;%%%%\r\n`;

        let closeWorldPairings = [];
        nodes.forEach((node) => {
            if (targets.includes(node.to) && sources.includes(node.from)) {
                let goalName;
                let refName;
                goals.forEach((goal) => {
                    if (goal.id === node.to) {
                        goalName = goal.name;
                    }
                });
                refinements.forEach((ref) => {
                    if (ref.id === node.from) {
                        refName = ref.name;
                    }
                });
                closeWorldPairings.push({goal: goalName, refinement: refName});
            }
        });

        for (i = 0; i < closeWorldPairings.length; i += 1) {
            if (i > 0) {
                if (closeWorldPairings[i].goal !== closeWorldPairings[i - 1].goal) {
                    smtOutput += `)))\r\n(assert (=> ${closeWorldPairings[i].goal}(or ${closeWorldPairings[i].refinement} `;
                } else {
                    smtOutput += ` ${closeWorldPairings[i].refinement} `;
                }
            } else {
                smtOutput += `\r\n(assert (=> ${closeWorldPairings[i].goal}(or ${closeWorldPairings[i].refinement}`;
            }

        }

        if (closeWorldPairings.length > 0) {
            smtOutput += `)))\r\n`
        }

        smtOutput += `\r\n\r\n`;

        // Refinement-Goal relationships

        smtOutput += `;;%%%%\r\n;Refinement-Goal relationships\r\n;%%%%\r\n`;

        let refGoalRelations = ``;

        refinements.forEach((ref) => {
            let rightSide = '';
            let leftSide = '';
            nodes.forEach((node) => {
                if (ref.id === node.to) {
                    goals.forEach((goal) => {
                        if (goal.id === node.from) {
                            leftSide += goal.name + ' ';
                        }
                    });
                } else if (ref.id === node.from) {
                    goals.forEach((goal) => {
                        if (goal.id === node.to) {
                            rightSide += goal.name + ' ';
                        }
                    });
                }
            });
            refGoalRelations += `(assert (and (= ${ref.name} (and ${leftSide})) (=> ${ref.name} ${rightSide})))\r\n`;
        });

        smtOutput += refGoalRelations;

        smtOutput += `\r\n\r\n`;

        // Mandatory goals

        smtOutput += `;;%%%%\r\n;Mandatory goals\r\n;%%%%\r\n`;

        mandatoryGoals.forEach((mandaGoal) => {
            smtOutput += `(assert ${mandaGoal})\r\n`;
        });

        smtOutput += `\r\n\r\n`;

        // Contributions

        contributions.forEach((c) => {
            goals.forEach((goal) => {
                if (goal.id === c.from) {
                    c.from = goal.name;
                }
                if (goal.id === c.to) {
                    c.to = goal.name;
                }
            });

            console.log({contributions});

            // Handle exclusion and precedence here
            if (c.relation === 'EXC') {
                smtOutput += `(assert (not (and ${c.from} ${c.to})))\r\n`;
            } else if (c.relation === 'PRE') {
                smtOutput += `(assert (=> ${c.to} ${c.from}))\r\n`;
            } else {
                smtOutput += `(assert (= ${c.name} (and ${c.from} ${c.to})))\r\n`;
                if (c.weight === 'undefined') {
                    c.weight = 1;
                }
                if (typeof c.relation === 'undefined') {
                    c.relation = 'none';
                }

                smtOutput += '(assert-soft (not ' + c.name + ') :weight ' + '1' + ' :id ' + c.relation + ')\r\n';
            }

        });

        /*        graph.attributes.cells.models.forEach((model) => {
                    if (typeof model.attributes.attrs['.label'] !== 'undefined') {
                        if (typeof model.attributes.attrs['.label'].weight !== 'undefined') {
                            if (model.attributes.type === 'standard.Goal') {
                                model.attributes.attrs['.label'].weight.forEach((w) => {
                                    console.log(w)
                                    smtOutput += '(assert-soft (not ' + model.attributes.attrs.label.text + ') :weight ' + w.attrs.text.body + ' :id ' + w.attrs.text.title + ')\r\n';
                                })
                            }

                        }
                    }
                })*/

        smtOutput += `\r\n\r\n`;

        // Preference

        let leafs = goals;
        let tops = goals;

        nodes.forEach((node) => {
            goals.forEach((goal) => {
                refinements.forEach((ref) => {
                    if (node.to === goal.id && node.from === ref.id) {
                        leafs = leafs.filter(e => e !== goal)
                    } else if (node.from === goal.id && node.to === ref.id) {
                        tops = tops.filter(e => e !== goal)
                    }
                })
            })
        });

        leafs = [...new Set(leafs)];
        tops = [...new Set(tops)];

        leafs.forEach((leaf) => {
            tops.forEach((top) => {
                if (leaf === top) {
                    leafs = leafs.filter(e => e !== leaf)
                }
            })
        });

        leafs.forEach((leaf) => {
            preference += `(assert-soft (not ${leaf.name} ) :id sat_tasks)\r\n`
        });

        tops.forEach((top) => {
            preference += `(assert-soft ${top.name} :id unsat_requirements)\r\n`
        });

        console.log({leafs});
        console.log({tops});

        // Real functions
        let reals = '(declare-fun pen.auto () Real)\r\n (assert (= pen.auto (- pen 0)))\r\n (declare-fun ben.auto () Real)\r\n (assert (= ben.auto (- ben 0)))\r\n (declare-fun effort.auto () Real)\r\n (assert (= effort.auto (- effort 0)))\r\n';

        // effort
        let eff = '\r\n (assert (<= effort 110))\r\n (assert-soft (<= 90 effort))\r\n'

        // Optimization scheme

        if (leafs.length < 1) {
            optimization = ` ;;%%\r\n;;Optimization:\r\n;;%%\r\n(maximize (+ NCC PVC))\r\n(maximize (+ pen.auto ben.auto))\r\n(minimize unsat_requirements)\r\n(check-sat)\r\n(load-objective-model 0)\r\n(get-model)\r\n(exit)\r\n`;
        } else {
            optimization = ` ;;%%\r\n;;Optimization:\r\n;;%%\r\n(maximize (+ NCC PVC))\r\n(maximize (+ pen.auto ben.auto))\r\n(minimize unsat_requirements)\r\n(check-sat)\r\n(load-objective-model 0)\r\n(get-model)\r\n(exit)\r\n`;
        }
        scheme = optimization;
        smtOutput += preference;
        smtOutput += reals;
        smtOutput += eff;
        smtOutput += optimization;

        // Duplicate check
        if ((new Set(funs)).size !== funs.length) {
            smtOutput = 'There are duplicate values in the goal model, please rename your Goals or Refinements uniquely and try again';
            return;
        }

        console.log(smtOutput)
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

