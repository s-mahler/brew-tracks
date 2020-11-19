import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class Timer extends Component {

    brewComplete = () => {
        this.props.history.push('/')
    }

    render() {
        return (
            <>
            <h1>00 : 00 : 00</h1>
            <button>Start</button>
            <button>Lap</button>
            <button>Stop</button>

            <br/>
            <br/>

            <button onClick={this.brewComplete}>Brewing Complete</button>
            </>
        )
    }
}

export default connect(mapStoreToProps)(Timer);