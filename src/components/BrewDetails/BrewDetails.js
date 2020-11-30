import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './BrewDetails.css';

class BrewDetails extends Component {


    state = {
        toggle: true,
        brewEdit: {
            id: 0,
            method: '',
            roast: '',
            grind: '',
            origin: '',
            amount_coffee: '',
            amount_water: '',
            taste: '',
            aroma: '',
            body: '',
            mouth_feel: ''
        },
        timesEdit: []
    }

    goBack = () => {
        this.props.history.push(`/brews/${this.props.store.user.id}`)
    }

    componentDidMount = () => {
        this.getSpecificBrew();
        this.getTimes();
    }

    // Get brew by id in the url, set it in the redux store
    getSpecificBrew = () => {
        this.props.dispatch({type: 'GET_SPECIFIC_BREW', payload: this.props.match.params.id});
    }

    // Get times by id in the url
    getTimes = () => {
        this.props.dispatch({type: 'GET_TIMES', payload: this.props.match.params.id})
    }

    // Toggle conditional render
    // Dispatch local state to a PUT route to edit brew and times
    putBrew = () => {
        this.setState({
            toggle: !this.state.toggle,
        });
        this.props.dispatch({type: 'PUT_BREW', payload: this.state.brewEdit});
        this.props.dispatch({type: 'PUT_TIMES', payload: this.state.timesEdit});
    }

    // On click of the edit button, set local state to what is stored in the redux store
    toggleView = () => {
        this.setState({
            toggle: !this.state.toggle,
            brewEdit: {
                id: this.props.store.brew[0].id,
                method: this.props.store.brew[0].brew_method,
                roast: this.props.store.brew[0].roast,
                grind: this.props.store.brew[0].grind,
                origin: this.props.store.brew[0].origin,
                amount_coffee: this.props.store.brew[0].coffee_amount,
                amount_water: this.props.store.brew[0].water_amount,
                taste: this.props.store.brew[0].taste,
                aroma: this.props.store.brew[0].aroma,
                body: this.props.store.brew[0].body,
                mouth_feel: this.props.store.brew[0].mouth_feel
            },
            timesEdit: this.props.store.times
        });
    }

    // On click of the delete button, show a warning
    // If OK is clicked, DELETE brew and times based on id in url
    // Send user back to their brews list
    showWarning = () => {
        if (window.confirm('Warning: this is permanent')) {
            this.props.dispatch({type: 'DELETE_BREW', payload: {brew_id: this.props.match.params.id, user_id: this.props.store.user.id}});
            this.props.dispatch({type: 'DELETE_TIMES', payload: this.props.match.params.id});
            this.props.history.push(`/brews/${this.props.store.user.id}`)
        };
    }

    // Handle change for editing brew inputs
    handleChange = (event, eventType) => {
        console.log(this.state.brewEdit);
        this.setState({
            brewEdit: {
                ...this.state.brewEdit,
                [eventType]: event.target.value
            }
        });
    }

    // handle change for times inputs, looping over every index of the times array
    // after the loop is complete, then the state is modified
    handleTimeChange = (event, eventType, timeId) => {
        console.log(this.state.timesEdit);
        let timesArray = this.state.timesEdit;
        for (let i = 0; i < timesArray.length; i++) {
            if (timeId === timesArray[i].id) {
                if (eventType === 'seconds') {
                    timesArray[i].seconds = event.target.value;
                } else if (eventType === 'minutes') {
                    timesArray[i].minutes = event.target.value;
                }
            }
        }
        this.setState({
            timesEdit: timesArray
        })
    }

    render() {
        return (
            <>
            <button className="button is-danger" onClick={this.showWarning}>DELETE</button>
            <div className="is-capitalized has-text-justified">
                {this.state.toggle ? (

                <>
                
                <h1>Brew Details</h1>
                <div>
                {this.props.store.brew.map(brew => {
                    return <div className="is-mobile" key={brew.id}>
                                <div className="box">
                                    <h3>Specifications</h3>

                                    <label>Method:</label>
                                    <p>{brew.brew_method}</p>

                                    <label>Origin:</label>
                                    <p>{brew.origin}</p>

                                    <label>Roast:</label>
                                    <p>{brew.roast}</p>

                                    <label>Grind:</label>
                                    <p>{brew.grind}</p>

                                    <label>Amount of Coffee:</label>
                                    <p>{brew.coffee_amount}</p>

                                    <label>Amount of Water:</label>
                                    <p>{brew.water_amount}</p>
                                </div>

                                <div className="box">
                                    <h3>Tasting Notes</h3>

                                    <label>Aroma:</label>
                                    <p>{brew.aroma}</p>

                                    <label>Taste:</label>
                                    <p>{brew.taste}</p>

                                    <label>Body:</label>
                                    <p>{brew.body}</p>

                                    <label>Mouth Feel:</label>
                                    <p>{brew.mouth_feel}</p>
                                </div>
                            </div>
                    })}
                    </div>
                    <h1>Phases</h1>
                    <ul className="box">
                    {this.props.store.times.map((time, index) => {
                        return <li key={time.id}>
                                    <div>
                                        <p className="has-text-weight-bold"> {index + 1}: </p>
                                        <p>{time.minutes} minutes</p> 
                                    
                                        <p>{time.seconds} seconds</p>
                                    </div>
                                </li>
                    })}
                    </ul>
                    </>

                ) : (

                    <div>
                        <button className="button my-5" onClick={this.putBrew}>Save</button>
                        <h1>Brew Details</h1>
                        <div className="is-flex is-flex-direction-column">
                            <div className="box is-flex is-flex-direction-column">
                                <label>Method:</label>
                                <input value={this.state.brewEdit.method} onChange={(event) => this.handleChange(event, 'method')}></input>

                                <label>Origin:</label>
                                <input value={this.state.brewEdit.origin} onChange={(event) => this.handleChange(event, 'origin')}></input>

                                <label>Roast:</label>
                                <input value={this.state.brewEdit.roast} onChange={(event) => this.handleChange(event, 'roast')}></input>

                                <label>Grind:</label>
                                <input value={this.state.brewEdit.grind} onChange={(event) => this.handleChange(event, 'grind')}></input>

                                <label>Amount of Coffee:</label>
                                <input value={this.state.brewEdit.amount_coffee} onChange={(event) => this.handleChange(event, 'amount_coffee')}></input>

                                <label>Amount of Water:</label>
                                <input value={this.state.brewEdit.amount_water} onChange={(event) => this.handleChange(event, 'amount_water')}></input>
                            </div>

                            <div className="box is-flex is-flex-direction-column">
                                <label>Aroma:</label>
                                <input value={this.state.brewEdit.aroma} onChange={(event) => this.handleChange(event, 'aroma')}></input>

                                <label>Taste:</label>
                                <input value={this.state.brewEdit.taste} onChange={(event) => this.handleChange(event, 'taste')}></input>

                                <label>Body:</label>
                                <input value={this.state.brewEdit.body} onChange={(event) => this.handleChange(event, 'body')}></input>

                                <label>Mouth Feel:</label>
                                <input value={this.state.brewEdit.mouth_feel} onChange={(event) => this.handleChange(event, 'mouth_feel')}></input>
                            </div>
                        </div>
                            <ul className="box is-flex is-flex-direction-column">
                                {this.state.timesEdit.map((time, index) => {
                                    return <li key={time.id}>
                                                <div className="is-flex is-flex-direction-column">
                                                    <p>{index + 1}</p>
                                                    <label> Minutes:</label>
                                                    <input type='number' value={time.minutes} onChange={(event) => this.handleTimeChange(event, 'minutes', time.id)}></input>

                                                    <label>Seconds:</label>
                                                    <input type='number' value={time.seconds} onChange={(event) => this.handleTimeChange(event, 'seconds', time.id)}></input>

                                                </div>
                                            </li>
                                })}
                            </ul>
                        </div>

                )}
                </div>
                <button className="button" onClick={this.goBack}>Back</button>
                <button className="button" onClick={this.toggleView}>Edit</button>
            </>
            
        )
        
    }
    
}


export default connect(mapStoreToProps)(BrewDetails);