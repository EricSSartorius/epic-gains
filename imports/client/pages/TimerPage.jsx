import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { autobind } from 'core-decorators';

import Timer from '../utilities/Timer';


@autobind
class TimerPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStart: false,
      elapsed: 0,
      diff: 0,
      view: 'time',
      laps: [],
    };
  }

  componentWillUnmount() { // clear timer
    clearInterval(this.state.timer);
    this.setState({ timer: undefined });
  }

  tick() {
    const elapsed = Date.now() - this.state.start + this.state.diff;
    const s = String(Math.floor((elapsed % (1000 * 60)) / 1000) + 100).substring(1);
    this.setState({ elapsed });
  }

  getTimeSpan(elapsed) {

    const m = String(Math.floor(elapsed / 1000 / 60));
    const s = String(Math.floor((elapsed % (1000 * 60)) / 1000) + 100).substring(1);
    const ms = String(Math.floor((elapsed % (1000 * 60)) / 10) + 100).substring(1);
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
    if (!this.state.isStart) {
      const timer = setInterval(this.tick, 33);
      this.setState({
        isStart: true,
        timer,
        start: new Date(),
      });
    } else { // pause
      clearInterval(this.state.timer);
      this.setState({
        timer: undefined,
        isStart: false,
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
      isStart: false,
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
        <h1>Timer</h1>
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
          {this.state.view === 'time' ? <h3>{this.getTimeSpan(this.state.elapsed)}</h3> : null }
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
            {this.state.isStart ? 'pause' : 'start'}
          </button>
          <button className="btn btn-cancel" onClick={this.reset}>reset</button>
        </div>
      </div>
    )
  }
}

TimerPage.propTypes = {
  currentUser: PropTypes.object,
};

export default createContainer(({params}) => {
  let userSub = Meteor.subscribe('currentUser');
  return {
    currentUser: Meteor.user(),
    ready: userSub.ready(),
  };
}, TimerPage);
