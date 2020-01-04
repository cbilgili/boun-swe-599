import {saveAs} from 'file-saver';

export function saveFile() {
    return (_, getState) => {
        const state = getState();
        const json = JSON.stringify(state);
        const blob = new Blob([json], {type: 'application/json'});
        saveAs(blob);
    }
}

export function loadFile(blob) {
    return dispatch => {
        const fr = new FileReader();
        fr.onload = (event) => {
            const data = JSON.parse(event.target.result);
            dispatch({type: 'LOAD_DATA', data});
        };
        fr.readAsText(blob)
    }
}

export function smtSolve() {
    let optimization = ` ;;%%\r\n;;Optimization:\r\n;;%%\r\n(maximize (+ NCC PVC))\r\n(maximize (+ pen.auto ben.auto))\r\n(minimize unsat_requirements)\r\n(check-sat)\r\n(load-objective-model 0)\r\n(get-model)\r\n(exit)\r\n`;


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
                let refinement = entity;
                funs.push(refinement.name);
                refinements.push(refinement);
            }
        });

        entities.forEach((entityId) => {
            const entity = getState().graph.entities[entityId];
            if (entity.type === 'link') {
                let link = entity;
                goals.forEach((goal) => {
                    if (link.target.id === goal.id) {
                        targets.push(link.target.id);
                    }
                });

                if (typeof link.relation !== "undefined") {
                    link.name = `CCR${k}`;
                    contributions.push(link)
                    k += 1;
                }

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
        smtOutput += `;; activate model generation\r\n` +
            `(set-option :produce-models true)\r\n` +
            `(set-option :opt.priority lex)\r\n\r\n`;

        // Duplicate check
        if ((new Set(funs)).size !== funs.length) {
            smtOutput = 'There are duplicate values in the goal model, please rename your Goals or Refinements uniquely and try again';
            return;
        }


        // Declaration of Goal, Assumption and Refinement Propositions
        smtOutput += `;; Declaration of Goal, Assumption and Refinement Propositions\r\n`;

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

        smtOutput += `;; Close-world\r\n`;

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
                smtOutput += `(assert (=> ${closeWorldPairings[i].goal}(or ${closeWorldPairings[i].refinement}`;
            }

        }

        if (closeWorldPairings.length > 0) {
            smtOutput += `)))\r\n`
        }

        smtOutput += `\r\n\r\n`;

        // Refinement-Goal relationships

        smtOutput += `;; Refinement-Goal relationships\r\n`;

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

        smtOutput += `;; Mandatory goals\r\n`;

        mandatoryGoals.forEach((mandaGoal) => {
            smtOutput += `(assert ${mandaGoal.name})\r\n`;
        });

        smtOutput += `\r\n\r\n`;

        // Contributions

        smtOutput += `;; Contributions\r\n`;

        contributions.forEach((c) => {
            goals.forEach((goal) => {
                if (goal.id === c.source.id) {
                    c.source = goal.name;
                }
                if (goal.id === c.target.id) {
                    c.target = goal.name;
                }
            });

            // Handle exclusion and precedence here
            if (c.relation === 'EXC') {
                smtOutput += `(assert (not (and ${c.source} ${c.target})))\r\n`;
            } else if (c.relation === 'PRE') {
                smtOutput += `(assert (=> ${c.target} ${c.source}))\r\n`;
            } else {
                smtOutput += `(assert (= ${c.name} (and ${c.source} ${c.target})))\r\n`;
                if (c.weight === 'undefined') {
                    c.weight = 1;
                }
                if (typeof c.relation === 'undefined') {
                    c.relation = 'none';
                }

                smtOutput += `(assert-soft (not ' + c.name + ') :weight ' + '1' + ' :id ' + c.relation + ')\r\n`;
            }
        });

        goals.forEach((g) => {
            g.weights.forEach((w) => {
                smtOutput += '(assert-soft (not ' + g.name + ') :weight ' + w.value + ' :id ' + w.name + ')\r\n';
            })
        });

        smtOutput += `\r\n\r\n`;

        // Preference
        let preference = `;; Preference:\r\n`;
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

        // Real functions
        let reals = '(declare-fun pen.auto () Real)\r\n' +
            '(assert (= pen.auto (- pen 0)))\r\n' +
            '(declare-fun ben.auto () Real)\r\n' +
            '(assert (= ben.auto (- ben 0)))\r\n' +
            '(declare-fun effort.auto () Real)\r\n' +
            '(assert (= effort.auto (- effort 0)))\r\n';

        // effort
        let eff = '(assert (<= effort 110))\r\n' +
            '(assert-soft (<= 90 effort))\r\n'

        // Optimization scheme

        if (leafs.length < 1) {
            optimization = `;; Optimization:\r\n` +
                `(maximize (+ NCC PVC))\r\n` +
                `(maximize (+ pen.auto ben.auto))\r\n` +
                `(minimize unsat_requirements)\r\n` +
                `(check-sat)\r\n` +
                `(load-objective-model 0)\r\n` +
                `(get-model)\r\n` +
                `(exit)\r\n`;
        } else {
            optimization = `;; Optimization:\r\n` +
                `(maximize (+ NCC PVC))\r\n` +
                `(maximize (+ pen.auto ben.auto))\r\n` +
                `(minimize unsat_requirements)\r\n` +
                `(check-sat)\r\n` +
                `(load-objective-model 0)\r\n` +
                `(get-model)\r\n` +
                `(exit)\r\n`;
        }

        smtOutput += preference;
        smtOutput += `\r\n\r\n`;
        smtOutput += reals;
        smtOutput += eff;
        smtOutput += `\r\n\r\n`;
        smtOutput += optimization;

        const blob = new Blob([smtOutput], {type: 'text'});

        if (window.navigator.msSaveOrOpenBlob) { // IE10+
            window.navigator.msSaveOrOpenBlob(blob, 'output.smt2');
        } else { // Others
            let a = document.createElement("a"),
                url = URL.createObjectURL(blob);
            a.href = url;
            a.download = 'output.smt2';
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);

        }
    }
}
