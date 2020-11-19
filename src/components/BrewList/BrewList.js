import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class BrewList extends Component {

    render() {
        return (
            <>
                {/* {brewsArray.map(brew => {
                    return <li onClick={this.props.goToDetails}>Brews go here <button>Delete</button></li>
                })} */}
                    
            </>
        )
    }
}

export default connect(mapStoreToProps)(BrewList);