import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import DiscNavbar from "../../components/DiscNavbar/DiscNavbar";
import Resource from "../../components/Resource/Resource";
import Folder from "../../components/Folder/Folder";
import File from "../../components/File/File";

import DiscService from '../../services/DiscService';

import {RESOURCE_TYPE} from "../../constants";
import Loader from "../../../shared/components/Loader/Loader";

class DiscLayout extends PureComponent {
    state = {
        data: [],
        isLoading: true
    }
    componentDidMount() {
       this._fetchResources();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
          this._fetchResources();
        }
    }

    _fetchResources = async () => {
        try {
            const { location } = this.props;
            let path = '';
            if (location.pathname === '/disc') {
                path = '/'
            } else {
                path = location.pathname.replace('/disc', '')
            }
            this.setState({isLoading: true})
            const data = await DiscService.getResources(path, 100);
            this.setState({data: data.data._embedded.items})
            this.setState({isLoading: false})
        } catch (e) {
            console.log(e) //доделать обработку ошибок
        }
    }

    onFolderClicked = (folderId) => {
        const { history } = this.props;
        const clickedFolder = this.state.data.find((x) => x.resource_id === folderId);

        if (!clickedFolder) {
            console.error(`Clicked folder with ${folderId} is undefined`)
        } else {
            const path = clickedFolder.path.replace('disk:', '/disc')
            history.push(path)
        }
    }

    render() {
        const { data, isLoading } = this.state;

        return (
            <div className="container d-flex flex-column" style={{height: '100vh'}}>
                <DiscNavbar/>
                {
                    isLoading ?
                        <div className="d-flex flex-grow-1 flex-column align-items-center justify-content-center">
                            <Loader/>
                        </div> :
                        <div className="row">
                            {
                                data.map(x => {
                                        if (x.type === RESOURCE_TYPE.FOLDER) {
                                            return(
                                                <Resource key={x.resource_id}>
                                                    <Folder
                                                        name={x.name}
                                                        id={x.resource_id}
                                                        onFolderClicked={this.onFolderClicked}/>
                                                </Resource>
                                            )
                                        } else if (x.type === RESOURCE_TYPE.FILE) { //Вынести перевод в килобайты в маппиг
                                            return(
                                                <Resource key={x.resource_id}>
                                                    <File
                                                        name={x.name}
                                                        size={Math.round(x.size / 1024)}/>
                                                </Resource>
                                            )
                                        } else {
                                            return null
                                        }
                                    }
                                )
                            }
                        </div>
                }
            </div>
        );
    }
}

DiscLayout.propTypes = {};

export default DiscLayout;
