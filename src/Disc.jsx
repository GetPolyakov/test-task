import React, {Component} from 'react';
import PropTypes from 'prop-types';

import LocalStorageService from './shared/services/LocalStorageService';
import DiscService from './disc/services/DiscService';
class Disc extends Component {
    state = {
        folderData: []
    }
    componentDidMount() {
        const token = LocalStorageService.getItem('token');
        // if (token) {
            DiscService.getResources(token, '/', 100)
                .then((x) => {
                    this.setState({
                        folderData: x.data._embedded.items
                    })
                })
                .catch((x) => {
                    console.log(x)
                })
        // } else {
        //     this.props.history.push('/login');
        // }

    }

    render() {
        return (
            <div style={{display: 'flex'}}>
                {this.state.folderData.map(x => <span>{x.name}</span>)}
            </div>
        );
    }
}

Disc.propTypes = {};

export default Disc;
