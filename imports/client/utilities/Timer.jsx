import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { autobind } from 'core-decorators';

@autobind
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStarted: false,
      isResting: false,
      elapsed: 0,
      diff: 0,
      view: 'time',
      laps: [],
    };
  }

  componentWillUnmount() {
    // clear timer
    clearInterval(this.state.timer);
    this.setState({ timer: undefined });
  }

  tick() {
    const elapsed = Date.now() - this.state.start + this.state.diff;
    const s = String(Math.floor((elapsed % (1000 * 60)) / 1000) + 100).substring(1);
    this.setState({ elapsed });
  }

  getRest() {
    if(this.state.isResting){
      return (<h3>... Second Rest</h3>);
    }
  }

  getTimeSpan(elapsed) {
    console.log(elapsed);
    const m = String(Math.floor(elapsed / 1000 / 60));
    const s = String(Math.floor((elapsed % (1000 * 60)) / 1000) + 100).substring(1);
    const ms = String(Math.floor((elapsed % (1000 * 60)) / 10) + 100).substring(0,2);
    if (s === '45') {
      this.state.isResting = true;
    } else if (m !== '00' && s === '00') {
      this.state.isResting = false;
    }

    return `${m}m ${s}s ${ms}ms`;
  }

  getSeconds() {
    return Math.floor((this.state.elapsed % (1000 * 60)) / 1000);
  }

  getSets(elapsed) {
    const m = Math.floor(elapsed / 1000 / 60);
    const s = Math.floor((elapsed % (1000 * 60)) / 1000);
    const ts = (m * 60) + s;
    return Math.floor(ts / 60);
  }

  onClick() {
    if (!this.state.isStarted) {
      const timer = setInterval(this.tick, 45);
      this.setState({
        isStarted: true,
        timer,
        start: new Date(),
      });
    } else { // pause
      clearInterval(this.state.timer);
      this.setState({
        timer: undefined,
        isStarted: false,
        diff: this.state.elapsed,
      });
    }
  }

  changeList(e) {
    this.setState({
      view: e.target.value,
    });
  }

  reset() {
    clearInterval(this.state.timer);
    this.setState({
      timer: undefined,
      isStarted: false,
      elapsed: 0,
      diff: 0,
      sets: 0,
      view: 'time',
      dancers: 0,
    });
  }

  render() {
    return (
      <div>
        <section className="settings-panel">
          <div className="form-row">
            <label htmlFor="">View Mode</label>
            <select name="view" id="" onChange={this.changeList} value={this.state.view}>
              <option value="sets">Sets</option>
              <option value="time">Time</option>
            </select>
          </div>
        </section>
        <div className="types-wrapper">
          {this.state.view === 'time' ?
            <div>
              <h3>Total Time elapsed:{this.getTimeSpan(this.state.elapsed)}</h3>
              <h3>Time for this set: {this.getTimeSpan(this.state.elapsed)}</h3>
              <div>{this.getRest()}</div>
            </div>
          : null }
          {this.state.view === 'sets' ?
            <div className="box-container">
              <div className="toggle-box">
                <h2>Time</h2>
                <h3>{this.getSeconds()}</h3>
              </div>
              <div className="toggle-box">
                <h2>Round</h2>
                <h3>{this.getSets(this.state.elapsed)}</h3>
              </div>
            </div> : null}
          <button className="btn btn-start" onClick={this.onClick}>
            {this.state.isStarted ? 'pause' : 'start'}
          </button>
          <button className="btn btn-cancel" onClick={this.reset}>reset</button>
        </div>
      </div>
    )
  }
}

Timer.propTypes = {
  currentUser: PropTypes.object,
};

export default createContainer(({params}) => {
  let userSub = Meteor.subscribe('currentUser');
  return {
    currentUser: Meteor.user(),
    ready: userSub.ready(),
  };
}, Timer);
