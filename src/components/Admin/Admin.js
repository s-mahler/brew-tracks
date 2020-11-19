import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class Admin extends Component {


    render() {
        return (
            <>
                <h1>Admin</h1>
            </>
        )
    }
}

export default connect(mapStoreToProps)(Admin);