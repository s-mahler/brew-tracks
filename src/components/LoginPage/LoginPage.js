import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LoginForm from '../LoginForm/LoginForm';

class LoginPage extends Component {

  startBrew = () => {
    this.props.history.push('/specs')
  }

  render() {
    return (
      <div>
        <LoginForm />

        <center>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              this.props.history.push('/registration');
            }}
          >
            Register
          </button>
          <br/>
          <br/>
          <button className="btn btn_sizeSm" onClick={this.startBrew}>Start Brew</button>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LoginPage);
