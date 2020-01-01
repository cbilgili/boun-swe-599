export default function transitionReducer(state, action) {
    switch (action.type) {
        case 'LOAD_DATA': {
            return action.data.transitions || state;
        }
        default:
            return state || {
                array: [1],
                entities: {
                    1: {
                        type: "Contribution",
                        name: "Contribution",
                        contributionType: "+C",
                        relationship: "PCC",
                        weight: 0,
                        n: 1
                    }
                }
            }
    }
}
