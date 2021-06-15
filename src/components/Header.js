import React from 'react';
import { connect } from 'react-redux';

import { saveFile, loadFile, downloadSmt, postSmt } from '../redux/actions/fileActions';
import { clearGraph, startEditingNodeType } from '../redux/actions/graphActions'

class Header extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-gray">
                <a className="" href="#"><img src="logo_transparent.png" width="150" /></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a href="#" className="nav-link" onClick={this.props.clearGraph}>Clear Graph</a>
                        </li>
                        <li className="nav-item active">
                            <a href="#" className="nav-link" onClick={this.props.startEditingNodeType}>Edit Goal Types</a>
                        </li>
                        <li className="nav-item dropdown active">
                            <a href="#" className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Import
        </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="#">JSON File <input type="file" accept=".json" hidden
                                    onChange={(event) => this.props.loadFile(event.target.files[0])} /></a>
                            </div>
                        </li>
                        <li className="nav-item dropdown active">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Export
        </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" onClick={this.props.saveFile}>JSON File</a>
                                <a className="dropdown-item" onClick={this.props.downloadSmt}>SMT2 File</a>
                            </div>
                        </li>
                    </ul>
                    <form className="form-inline my-1 pl-4">
                        <input className="form-control mt-2 mr-sm-2" type="search" placeholder="Expression" aria-label="Search" />
                        <button className="btn btn-outline-success mt-2 my-sm-0" type="submit" onClick={(event) => this.props.postSmt(event.target.value)}>Solve</button>
                    </form>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    const nodeTypes = state.nodeTypes.array;
    return {
        nodeTypes,
    };
}

const mapDispatchToProps = {
    saveFile,
    loadFile,
    clearGraph,
    downloadSmt,
    postSmt,
    startEditingNodeType

}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
