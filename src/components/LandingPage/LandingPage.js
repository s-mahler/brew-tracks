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
      <div>
        <button className="btn btn_sizeSm" onClick={this.startBrew}>Start Brew</button>
        <button className="btn btn_sizeSm" onClick={this.viewBrews}>View Brews</button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
