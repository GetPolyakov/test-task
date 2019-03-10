import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './InfiniteScroll.scss';

const SCROLL_TRIGGER_DISTANCE = 0.2;
export class InfiniteScroll extends Component {
    componentDidMount() {
        if (this.props.useWindowScroll) {
            window.addEventListener('scroll', this.onScroll, false);
        }
    }

    componentWillUnmount() {
        if (this.props.useWindowScroll) {
            window.removeEventListener('scroll', this.onScroll, false);
        }
    }

    get scrolledHeight() {
        const { useWindowScroll } = this.props;
        if (useWindowScroll) {
            return window.innerHeight + window.scrollY;
        }

        return this.domNode.scrollTop + this.domNode.offsetHeight
    }

    get totalScrollHeight() {
        const { useWindowScroll } = this.props;
        if (useWindowScroll) {
            return document.body.scrollHeight - document.body.scrollHeight * SCROLL_TRIGGER_DISTANCE;
        }

        return this.domNode.scrollHeight - this.domNode.scrollHeight * SCROLL_TRIGGER_DISTANCE;
    }

    onScroll = (e) => {
        if (
            this.scrolledHeight >= this.totalScrollHeight
            && this.props.shouldHandleScroll
        ) {
            this.props.onScroll();

        }
    }

    setDomeNode = (e) => this.domNode = e

    render() {
        return (
            <div
                ref={this.setDomeNode}
                className="infinite-scroll row"
                onScroll={this.onScroll}
            >
                {this.props.children}
            </div>
        )
    }



}

InfiniteScroll.propTypes = {
    onScroll: PropTypes.func,
    shouldHandleScroll: PropTypes.bool,
    useWindowScroll: PropTypes.bool
}
