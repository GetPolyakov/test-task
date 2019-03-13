import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {connect} from "react-redux";
import { debounce } from 'lodash';

import { DiscNavbar } from "../../components/DiscNavbar/DiscNavbar";
import { Resource } from "../../components/Resource/Resource";
import { Folder } from "../../components/Folder/Folder";
import { File } from "../../components/File/File";
import { Loader } from "../../../shared/components/Loader/Loader";
import { InfiniteScroll } from "../../../shared/components/InfiniteScroll/InfiniteScroll";

import { resourcesSelector } from "../../selectors/selector.resources";
import { fetchResources } from "../../actions/action.fetch-resources";
import { fetchResourcesMore } from "../../actions/action.fetch-resources-more";

import { ResourceType } from "../../constants";
import { NOT_FOUND_CODE, UNAUTHORIZED_CODE } from "../../../auth/constants";

import './DiscLayout.scss';

const DEBOUNCE_DELAY = 700;
const DEFAULT_URL = '/disc';

class Disc extends Component {
    constructor(props) {
        super(props)
        this.state = {
            folderData: [],
        }
        this.debouncedResourcesLoad = debounce(this.fetchResourcesMore, DEBOUNCE_DELAY, {leading: false});
    }


    componentDidMount() {
        this.fetchResources();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location.pathname !== this.props.location.pathname) { //указать точно
          this.fetchResources();
        }
    }

    fetchResources = async () => {
        try {
            const { location, fetchResources, limit } = this.props;

            const resourcePath = this._getRequestedResourcePathByUrl(location.pathname);

            await fetchResources(resourcePath, limit);

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

    fetchResourcesMore = async () => {
        try {
            const { location, fetchResourcesMore, limit, offset, resources } = this.props;

            const resourcePath = this._getRequestedResourcePathByUrl(location.pathname);

            if (offset < resources._embedded.total) {
                await fetchResourcesMore(resourcePath, limit, offset);
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

    _getRequestedResourcePathByUrl = (url) => {
        if (url === DEFAULT_URL) {
            return '/'
        } else {
            return url.replace(DEFAULT_URL, '')
        }
    }

    onFolderClicked = (folderId) => {
        const { history, resources } = this.props;
        const clickedFolder = resources._embedded.items.find((x) => x.resource_id === folderId);

        if (!clickedFolder) {
            console.error(`Clicked folder with ${folderId} is undefined`)
        } else {
            const path = clickedFolder.path.replace('disk:', DEFAULT_URL)
            history.push(path)
        }
    }

    render() {
        const { resources, isLoading, isScrollLoading, hasMoreRecords } = this.props;

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
                                shouldHandleScroll={hasMoreRecords}
                            >
                                {
                                    (resources.type !== ResourceType.FILE) ? //обработать пустой обджект и состояние еррор
                                    resources._embedded.items.map(x => {
                                            if (x.type === ResourceType.FOLDER) {
                                                return(
                                                    <Resource key={x.resource_id}>
                                                        <Folder
                                                            name={x.name}
                                                            id={x.resource_id}
                                                            onFolderClicked={this.onFolderClicked}/>
                                                    </Resource>
                                                )
                                            } else if (x.type === ResourceType.FILE) {
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

                                    : <Redirect to={DEFAULT_URL} />
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

export const DiscLayout = connect(
    state => {
        return {
            resources: resourcesSelector(state),
            offset: state.resources.offset,
            limit: state.resources.limit,
            isLoading: state.resources.isLoading,
            isScrollLoading: state.resources.isScrollLoading,
            hasMoreRecords: state.resources.hasMoreRecords,
        }
    },
    dispatch => ({
        fetchResources: (resourcePath, limit) => dispatch(fetchResources(resourcePath, limit)),
        fetchResourcesMore: (resourcesPath, limit, offset) => dispatch(fetchResourcesMore(resourcesPath, limit, offset))
    })
)(Disc);

Disc.propTypes = {
    resources: PropTypes.object,
    offset: PropTypes.number,
    limit: PropTypes.number,
    isLoading: PropTypes.bool,
    isScrollLoading: PropTypes.bool,
    hasMoreRecords: PropTypes.bool,
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
};
