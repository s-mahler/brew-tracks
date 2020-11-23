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
      };

    render() {
        return (
            <>
            <h1>{this.state.timerMath.minutes} : {this.state.timerMath.seconds} : {this.state.timerMath.centiseconds}</h1>
            <button onClick={this.startTimer}>Start</button>
            <button onClick={this.setLap}>Lap</button>
            <button onClick={this.stopTimer}>Stop</button>
            <button onClick={this.resetTimer}>Reset</button>
            {this.state.lapArray.map((time, index) => {
                return <div key={index}>
                    <p>{time.minutes} : {time.seconds} : {time.centiseconds}</p>
                </div>
            })}

            <br/>
            <br/>

            <button onClick={this.brewComplete}>Brewing Complete</button>
            </>
        )
    }
}

export default connect(mapStoreToProps)(Timer);