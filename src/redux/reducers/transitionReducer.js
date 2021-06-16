export default function transitionReducer(state, action) {
    switch (action.type) {
        case 'LOAD_DATA': {
            return action.data.transitions || state;
        }
        default:
            return state || {
                array: [1, 2, 3, 4, 5, 6],
                entities: {
                    1: {
                        type: "Contribution",
                        name: "C+",
                        contributionType: "+C",
                        relationship: "PCC",
                        weight: 0,
                        n: 1
                    },
                    2: {
                        type: "Contribution",
                        name: "C-",
                        contributionType: "-C",
                        relationship: "NCC",
                        weight: 0,
                        n: 2
                    },
                    3: {
                        type: "Contribution",
                        name: "V+",
                        contributionType: "+V",
                        relationship: "PVC",
                        weight: 0,
                        n: 3
                    },
                    4: {
                        type: "Contribution",
                        name: "V-",
                        contributionType: "-V",
                        relationship: "NVC",
                        weight: 0,
                        n: 4
                    },
                    5: {
                        type: "Contribution",
                        name: "pre",
                        contributionType: "PRE",
                        relationship: "PR",
                        weight: 0,
                        n: 5
                    },
                    6: {
                        type: "Contribution",
                        name: "Exclusion",
                        contributionType: "EXC",
                        relationship: "EX",
                        weight: 0,
                        n: 6
                    }
                }
            }
    }
}
