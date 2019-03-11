import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import { DiscNavbar } from "../../components/DiscNavbar/DiscNavbar";
import { Resource } from "../../components/Resource/Resource";
import { Folder } from "../../components/Folder/Folder";
import { File } from "../../components/File/File";
import { Loader } from "../../../shared/components/Loader/Loader";
import { InfiniteScroll } from "../../../shared/components/InfiniteScroll/InfiniteScroll";

import { DiscService } from '../../services/service.disc';

import { RESOURCE_TYPE } from "../../constants";
import { NOT_FOUND_CODE, UNAUTHORIZED_CODE } from "../../../auth/constants";

import './DiscLayout.scss';

const DEBOUNCE_DELAY = 700;
const DEFAULT_URL = '/disc';

export class DiscLayout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            folderData: [],
            offset: 0,
            limit: 40,
            isLoading: true,
            isScrollLoading: false,
            hasMoreRecords: false,
        }
        this.debouncedResourcesLoad = debounce(this._fetchResourcesWithScroll, DEBOUNCE_DELAY, {leading: false});
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
            const { limit }  = this.state;

            const resourcePath = this._getRequestedResourcePathByUrl(location.pathname);

            this.setState({isLoading: true})

            const resource = await DiscService.getResources(resourcePath, limit);
            if (resource.type === RESOURCE_TYPE.FOLDER) {
                const mappedResource = DiscService.mapResourcesToView(resource);
                const total = mappedResource._embedded.total;
                const embeddedItems = mappedResource._embedded.items;

                if (embeddedItems.length < total) {
                    this.setState((state, props) => {
                        return {
                            offset: state.offset + state.limit,
                            hasMoreRecords: true,
                            isLoading: false,
                            folderData: embeddedItems
                        }
                    })
                } else {
                    this.setState({
                        folderData: embeddedItems,
                        hasMoreRecords: false,
                        isLoading: false
                    })
                }

            } else {
               history.push(DEFAULT_URL);
            }
        } catch (e) {
            const responseStatus = e.response.status;
            if (responseStatus === UNAUTHORIZED_CODE) {
                return;
            }
            if (responseStatus === NOT_FOUND_CODE) {
                this.props.history.push(DEFAULT_URL);
            } else {
                alert('Something went wrong, please make sure you have stable connection to the internet.')
                console.error(e);
            }
        }
    }

    _fetchResourcesWithScroll = async () => {
        try {
            const { location, history } = this.props;
            const { limit, offset, folderData }  = this.state;

            const resourcePath = this._getRequestedResourcePathByUrl(location.pathname);

            this.setState({isScrollLoading: true})

                const resource = await DiscService.getResources(resourcePath, limit, offset);
                if (resource.type === RESOURCE_TYPE.FOLDER) {

                    const mappedResource = DiscService.mapResourcesToView(resource);
                    const total = mappedResource._embedded.total;
                    const embeddedItems = mappedResource._embedded.items;

                    const loadedFolderData = folderData.concat(embeddedItems);
                    if (loadedFolderData.length < total) {
                        this.setState((state, props) => {
                            return {
                                offset: state.offset + state.limit,
                                hasMoreRecords: true,
                                isScrollLoading: false,
                                folderData: loadedFolderData
                            }
                        })
                    } else {
                        this.setState({
                            folderData: loadedFolderData,
                            hasMoreRecords: false,
                            isScrollLoading: false
                        })
                    }

                } else {
                    history.push(DEFAULT_URL)
                }

        } catch (e) {
            const responseStatus = e.response.status;
            if (responseStatus === UNAUTHORIZED_CODE) {
                return;
            }
            if (responseStatus === NOT_FOUND_CODE) {
                this.props.history.goBack();
            } else {
                alert('Something went wrong, please make sure you have stable connection to the internet.')
                console.error(e);
            }

        }
    }

    _getRequestedResourcePathByUrl = (url) => {
        if (url === DEFAULT_URL) {
            return '/'
        } else {
            return url.replace(DEFAULT_URL, '')
        }
    }

    onFolderClicked = (folderId) => {
        const { history } = this.props;
        const clickedFolder = this.state.folderData.find((x) => x.resource_id === folderId);

        if (!clickedFolder) {
            console.error(`Clicked folder with ${folderId} is undefined`)
        } else {
            const path = clickedFolder.path.replace('disk:', DEFAULT_URL)
            history.push(path)
        }
    }

    render() {
        const { folderData, isLoading, isScrollLoading } = this.state;

        return (
            <div className="container d-flex flex-column disc-layout">
                <DiscNavbar/>
                {
                    isLoading ?
                        <div className="d-flex flex-grow-1 flex-column align-items-center justify-content-center">
                            <Loader/>
                        </div> :
                        <>
                            <InfiniteScroll
                                useWindowScroll={true}
                                onScroll={this.debouncedResourcesLoad}
                                shouldHandleScroll={this.state.hasMoreRecords}
                            >
                                {
                                    folderData.map(x => {
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
                            </InfiniteScroll>
                            {
                                isScrollLoading ?
                                <div className="d-flex flex-grow-1 justify-content-center align-items-end"><Loader/></div>
                                :
                                null
                            }
                        </>
                }
            </div>
        );
    }
}

DiscLayout.propTypes = {};
