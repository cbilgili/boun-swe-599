import { saveAs } from 'file-saver';
export function saveFile() {
    return (_, getState) => {
        const state = getState();
        const json = JSON.stringify(state);
        const blob = new Blob([json], { type: 'application/json' });
        saveAs(blob)
    }
}

export function loadFile(blob) {
    return dispatch => {
        const fr = new FileReader();
        fr.onload = (event) => {
            const data = JSON.parse(event.target.result);
            dispatch({ type: 'LOAD_DATA', data });
        }
        fr.readAsText(blob)
    }
}
