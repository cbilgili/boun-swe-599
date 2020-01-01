import React from 'react';
import {connect} from 'react-redux';
import {DndProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend'
import ElementsMenu from "./components/SideBar";
import DrawToolContainer from "./components/GraphContainer";


class App extends React.Component {
    render() {
        return <div className="container-fluid">
            <div className="row">
                <DndProvider backend={HTML5Backend}>
                    <ElementsMenu/>
                    <DrawToolContainer/>
                </DndProvider>
            </div>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        editingElement: state.editingElement,
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(App);

