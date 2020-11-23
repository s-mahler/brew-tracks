import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class Brews extends Component {

    startAgain = () => {
        this.props.history.push('/specs')
    }

    accountDetails = () => {
        this.props.history.push('/user')
    }

    goToDetails = (brewId) => {
        this.updateTimesId();
        this.props.history.push(`/details/${brewId}`);
    };

    componentDidMount = () => {
        this.getUserBrews();
    }

    getUserBrews = () => {
        this.props.dispatch({type: 'GET_BREWS', payload: this.props.match.params.id});
    }

    updateTimesId = () => {
        this.props.dispatch({type: 'PUT_TIMES_ID', payload: {brew_id: this.props.store.brew[this.props.store.brew.length - 1].id}})
    }

    render() {
        return (
            <>
                <button onClick={this.accountDetails}>Account Details</button>
                
                <h1>Your brews</h1>
                
                <ul>
                    {this.props.store.brew.map(brew => {
                        return <li className="brew" key={brew.id} onClick={() => this.goToDetails(brew.id)}>
                                    <div>
                                        <p>{brew.origin}</p>
                                        <p>{brew.brew_method}</p>
                                    </div>
                                </li>
                    })}
                </ul>

                <button onClick={this.startAgain}>Start new brew</button>
            </>
        )
    }
}

export default connect(mapStoreToProps)(Brews);