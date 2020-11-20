import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class ReviewBrew extends Component {

    handleSubmit = () => {
        this.props.history.push(`/brews/${this.props.store.user.id}`);
    };

    componentDidMount = () => {
        console.log(Object.keys(this.props.store.inputs.specs));
    }

    render() {
        return (
            <>
                {this.props.store.inputs.times && this.props.store.inputs.specs && this.props.store.inputs.tasting ? (
                    <>
                        <h1>YES</h1>
                        {Object.entries(this.props.store.inputs.specs).map((key, value) => {
                            return <p>{key} : {value}</p>
                        })}
                        
                        {this.props.store.inputs.times.map((time, index) => {
                            return <p key={index}>{time.minutes} : {time.seconds} : {time.centiseconds}</p>
                        })}

                        {/* {this.props.store.inputs.tasting.map((note) => {
                            return <p>{note}</p>
                        })} */}

                        <button onClick={this.handleSubmit}>Save</button>
                    </>
                ) : (
                    <h1>Start a new brew</h1>
                )}
            </>
        )
    }
}

export default connect(mapStoreToProps)(ReviewBrew);