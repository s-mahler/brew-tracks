import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import './LandingPage.css';

// CUSTOM COMPONENTS
import LoginForm from '../LoginForm/LoginForm';

class LandingPage extends Component {
  state = {
    heading: 'Class Component',
  };

  // onRegister = (event) => {
  //   this.props.history.push('/registration');
  // };

  startBrew = () => {
    this.props.history.push('/specs')
  }

  render() {
    return (
      <div className="container">
        {/* <h2>{this.state.heading}</h2> */}

        <div className="grid">
          {/* <div className="grid-col grid-col_8">
            
          </div> */}
          <div>
           
            <LoginForm />
 
            <div>
              <button className="btn btn_sizeSm" onClick={this.startBrew}>Start Brew</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
