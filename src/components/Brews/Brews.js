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
        this.props.history.push(`/details/${brewId}`);
    };

    componentDidMount = () => {
        this.getUserBrews();
    }

    getUserBrews = () => {
        this.props.dispatch({type: 'GET_BREWS', payload: this.props.match.params.id});
    }

    render() {
        return (
            <div className="is-flex is-flex-direction-column">
                
                
                <p className="is-size-3 has-text-centered has-text-weight-bold">Your brews</p>
                
                <ul className="tile has-text-centered is-capitalized is-parent">
                    {this.props.store.brew.map(brew => {
                        return <li className="column is-narrow" key={brew.id} onClick={() => this.goToDetails(brew.id)}>
                                    <div className="tile is-child box">
                                        <p>{brew.origin}</p>
                                        <p>{brew.brew_method}</p>
                                    </div>
                                </li>
                    })}
                </ul>
                <div className="container is-flex is-flex-direction-column">
                    <button className="button m-1" onClick={this.startAgain}>Start new brew</button>
                    <button className="button m-1" onClick={this.accountDetails}>Account Details</button>
                </div>
            </div>
        )
    }
}

export default connect(mapStoreToProps)(Brews);