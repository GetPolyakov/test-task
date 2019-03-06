import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { TEST } from "./actions/testAction";

const Test = (props) => {
    return <div onClick={props.onTest}> omg {props.test}</div>
}

export default connect(
    state => ({
        test: state.reducerTest.test
    }),
    dispatch => ({
        onTest: () => dispatch({type: TEST})
    })
)(Test);
