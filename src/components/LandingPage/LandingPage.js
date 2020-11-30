import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import './LandingPage.css';

// CUSTOM COMPONENTS

class LandingPage extends Component {
  state = {
    heading: 'Class Component',
  };


  startBrew = () => {
    this.props.history.push('/specs')
  }

  viewBrews = () => {
    this.props.history.push(`/brews/${this.props.store.user.id}`);
  }

  render() {
    return (
      <div className="has-text-centered">
      <p className="m-6 is-size-4 has-text-weight-bold">Welcome, {this.props.store.user.username}!</p>
      <div className="is-flex is-justify-content-space-evenly">
        
        <div className="">
          <button className="button" onClick={this.startBrew}>Start Brew</button>
        </div>
        <div className="">
          <button className="button" onClick={this.viewBrews}>View Your Brews</button>
        </div>
      </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
