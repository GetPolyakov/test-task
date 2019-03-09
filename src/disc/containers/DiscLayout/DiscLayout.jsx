import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import DiscNavbar from "../../components/DiscNavbar/DiscNavbar";
import Resource from "../../components/Resource/Resource";
import Folder from "../../components/Folder/Folder";
import File from "../../components/File/File";

import DiscService from '../../services/DiscService';

import {RESOURCE_TYPE} from "../../constants";

class DiscLayout extends PureComponent {
    state = {
        folderData: []
    }
    componentDidMount() {
        DiscService.getResources('/', 100)
            .then((x) => {
                this.setState({
                    folderData: x.data._embedded.items
                })
            })
            .catch((x) => {
                console.log(x)
            })
    }

    onFolderClicked = (folderId) => {
        const clickedFolder = this.state.folderData.find((x) => x.resource_id === folderId);

        if (!clickedFolder) {
            console.error(`Clicked folder with ${folderId} is undefined`)
        } else {
            DiscService.getResources(clickedFolder.path, 100)
                .then((x) => {
                    this.setState({
                        folderData: x.data._embedded.items
                    })
                })
                .catch((x) => {
                    console.log(x)
                })
        }
    }

    render() {
        return (
            <div className="container">
                <DiscNavbar/>
                <div className="row">
                    {
                        this.state.folderData.map(x => {
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
            </div>
        );
    }
}

DiscLayout.propTypes = {};

export default DiscLayout;
