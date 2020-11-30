import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class Timer extends Component {

    state = {
        on: false,
        timeStart: 0,
        timeNow: 0,
        lapArray: [],
        timerMath: {
            centiseconds: "00",
            seconds: "00",
            minutes: "00"
        }
    }

    brewComplete = () => {
        this.props.dispatch({type: 'ADD_TIMES', payload: this.state.lapArray})
        this.props.history.push('/tasting');
    }

    startTimer = () => {
        if (this.state.on === false) {
            this.setState({
                on: true,
                timeNow: this.state.timeNow,
                timeStart: Date.now() - this.state.timeNow
            });
            this.timer = setInterval(() => {
                this.setState({
                    timeNow: Date.now() - this.state.timeStart,
                    timerMath: {
                        centiseconds: ("0" + (Math.floor(this.state.timeNow / 10) % 100)).slice(-2),
                        seconds: ("0" + (Math.floor(this.state.timeNow/ 1000) % 60)).slice(-2),
                        minutes: ("0" + (Math.floor(this.state.timeNow / 60000) % 60)).slice(-2)
                    }
                });
            }, 10);
        }
    }

    stopTimer = () => {
        if (this.state.on) {
            this.state.lapArray.push(this.state.timerMath);
            this.setState({
                on: false
            });
            clearInterval(this.timer);
        }
    }

    setLap = () =>{
        if (this.state.on) {
            this.state.lapArray.push(this.state.timerMath)
        }
    }

    // Only works from a stopped timer, not from a running one
    // sets the values to the current time
    resetTimer = () => {
        this.setState({
          timeStart: 0,
          timeNow: 0,
          lapArray: [],
          timerMath: {
            centiseconds: "00",
            seconds: "00",
            minutes: "00"
        }
        });
        this.stopTimer();
      };

    render() {
        return (

            <>
                <div className="section has-text-weight-bold">
                    <p className="is-size-1">{this.state.timerMath.minutes} : {this.state.timerMath.seconds} : {this.state.timerMath.centiseconds}</p>
                </div>

                <div className="columns is-mobile">
                    
                    <div className="column is-narrow has-text-centered">
                        <div className="buttons has-addons are-small">
                            <button className="button" onClick={this.startTimer}>Start</button>
                            <button className="button" onClick={this.setLap}>Lap</button>
                            <button className="button" onClick={this.stopTimer}>Stop</button>
                        </div>
                    
                        <div className="m-4">
                            <button className="button is-small" onClick={this.resetTimer}>Reset</button>
                        </div>

                        <button className="button is-small" onClick={this.brewComplete}>Brewing Complete</button>
                    </div>
                
                    <div className="column has-text-centered has-background-light">
                        <p>Times</p>
                        {this.state.lapArray.map((time, index) => {
                            return <div key={index}>
                                <p>{time.minutes} : {time.seconds} : {time.centiseconds}</p>
                            </div>
                        })}
                    </div>
                </div>
            </>
        )
    }
}

export default connect(mapStoreToProps)(Timer);