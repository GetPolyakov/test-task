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
            const { location, history } = this.props;

            const resourcePath = this._getRequestedResourcePathByUrl(location.pathname);

            this.setState({isLoading: true})

            const resource = await DiscService.getResources(resourcePath, 100);
            if (resource.type === RESOURCE_TYPE.FOLDER) {
                const mappedResource = DiscService.mapResourcesToView(resource);
                this.setState({data: mappedResource._embedded.items})
            } else {
               history.goBack()
            }

            this.setState({isLoading: false})
        } catch (e) {
            alert('Something went wrong, please make sure you have stable connection to the internet.')
            console.error(e);
        }
    }

    _getRequestedResourcePathByUrl = (url) => {
        if (url === '/disc') {
            return '/'
        } else {
            return url.replace('/disc', '')
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
                                        } else if (x.type === RESOURCE_TYPE.FILE) {
                                            return(
                                                <Resource key={x.resource_id}>
                                                    <File
                                                        name={x.name}
                                                        size={x.size}/>
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
