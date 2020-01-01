export function editType(nodeType) {
    return { type: 'EDIT_TYPE', nodeType };
}

export function closeTypeEditor() {
    return { type: 'CLOSE_TYPE_EDITOR' };
}
