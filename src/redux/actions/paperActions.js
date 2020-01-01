export function startDragging() {
    return { type: 'START_DRAGGING' };
}

export function stopDragging() {
    return { type: 'STOP_DRAGGING' };
}

export function startPanning(panPoint) {
    return { type: 'START_PANNING', panPoint };
}

export function stopPanning(x, y) {
    return dispatch => {
        dispatch({ type: 'STOP_PANNING' });
        dispatch({ type: 'SET_ORIGIN', x, y })
    }
}

export function startLinking() {
    return { type: 'START_LINKING' };
}

export function stopLinking() {
    return { type: 'STOP_LINKING' };
}
