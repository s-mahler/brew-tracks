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
        }
    }

    goBack = () => {
        this.props.history.push(`/brews/${this.props.store.user.id}`)
    }

    componentDidMount = () => {
        this.getSpecificBrew();
        this.getTimes();
    }

    getSpecificBrew = () => {
        this.props.dispatch({type: 'GET_SPECIFIC_BREW', payload: this.props.match.params.id});
    }

    getTimes = () => {
        this.props.dispatch({type: 'GET_TIMES', payload: this.props.match.params.id})
    }

    putBrew = () => {
        this.setState({
            toggle: !this.state.toggle,
        });
        this.props.dispatch({type: 'PUT_BREW', payload: this.state.brewEdit})
    }

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
            }
        });
    }

    showWarning = () => {
        if (window.confirm('Warning: this is permanent')) {
            this.props.dispatch({type: 'DELETE_BREW', payload: this.props.match.params.id});
            this.props.dispatch({type: 'DELETE_TIMES', payload: this.props.match.params.id});
            this.props.history.push(`/brews/${this.props.store.user.id}`)
        };
    }

    handleChange = (event, eventType) => {
        console.log(this.state.brewEdit);
        this.setState({
            brewEdit: {
                ...this.state.brewEdit,
                [eventType]: event.target.value
            }
        });
    }

    render() {
        return (
            <>
            <button onClick={this.showWarning}>DELETE</button>
                {this.state.toggle ? (

                <>
                <button onClick={this.toggleView}>Edit</button>
                <h1>Brew Details</h1>
                {this.props.store.brew.map(brew => {
                    return <div key={brew.id}>
                                <div className="specs">
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

                                <div className="tasting">
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
                    <h1>Phases</h1>
                    {this.props.store.times.map(time => {
                        return <div key={time.id}>
                                    <div className="tasting">
                                        <p>{time.minutes} : {time.seconds} : {time.centiseconds}</p>
                                    </div>
                                </div>
                    })}
                    </>

                ) : (

                    <div>
                        <button onClick={this.putBrew}>Save</button>
                        <h1>Brew Details</h1>
                                        <div className="specs">
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

                                        <div className="tasting">
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
                )}
                <button onClick={this.goBack}>Back</button>
            </>
        )
    }
}

export default connect(mapStoreToProps)(BrewDetails);