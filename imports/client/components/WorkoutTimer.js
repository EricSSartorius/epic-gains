/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-unresolved: 0 */
/* eslint import/extensions: 0 */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SoundPlayerComponents, { PlayButton, Timer, Progress, Icons } from 'react-soundplayer/components';
import SoundPlayerAddons, { SoundPlayerContainer } from 'react-soundplayer/addons';

const audio = new Audio('/instantrapairhorn.mp3');
const audio1 = new Audio('/champ.mp3');

class WorkoutTimer extends Component {
  state = {
    timer: undefined,
    timerInProgress: false,
    numberOfSets: 3,
    numberOfExercises: 3,
    restTime: 15,
    exerciseTime: 5,
    currentTime: 0,
    currentExerciseNumber: 1,
    currentSetNumber: 1,
  }

  componentDidMount() {
    this.setState({ currentTime: this.state.exerciseTime });
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
    this.setState({ timer: undefined });
  }

  getTimeSpan = (currentTime) => {
    const seconds = (`0${currentTime % 60}`).slice(-2);
    const minutes = (`0${Math.floor(currentTime / 60)}`).slice(-2);
    return `${minutes} : ${seconds}`;
  }

  tick = () => {
    const currentTime = this.state.currentTime - 1;
    if (currentTime <= 0) {
      this.resetCheck();
    } else {
      this.setState({ currentTime });
    }
  }

  toggleTimer = () => {
    if (!this.state.timerInProgress) {
      const timer = setInterval(this.tick, 1000);
      this.setState({
        timerInProgress: true,
        timer,
      });
    } else {
      clearInterval(this.state.timer);
      this.setState({
        timer: undefined,
        timerInProgress: false,
      });
    }
  }

  resetCheck = () => {
    const {
      currentExerciseNumber,
      currentSetNumber,
      numberOfExercises,
      numberOfSets,
    } = this.state;

    if (currentExerciseNumber >= numberOfExercises) {
      if (currentSetNumber >= numberOfSets) {
        this.resetTimer(true);
      } else {
        this.setState({ currentExerciseNumber: 1, currentSetNumber: currentSetNumber + 1 });
        // audio1.play();
        this.resetTimer(false);
      }
    } else {
      this.setState({ currentExerciseNumber: currentExerciseNumber + 1 });
      // audio1.play();
      this.resetTimer(false);
    }
  }

  resetTimer = (hardReset) => {
    clearInterval(this.state.timer);
    if (hardReset) {
      this.setState({
        timer: undefined,
        timerInProgress: false,
        currentTime: this.state.exerciseTime,
        currentSetNumber: 1,
        currentExerciseNumber: 1,
      });
    } else {
      const timer = setInterval(this.tick, 1000);
      this.setState({
        timer,
        currentTime: this.state.exerciseTime,
      });
    }
  }

  render() {
    const {
      currentTime,
      numberOfExercises,
      numberOfSets,
      currentExerciseNumber,
      currentSetNumber,
      timerInProgress,
    } = this.state;

    return (
      <div>
        <h2>Time</h2>
        <h3>{this.getTimeSpan(currentTime)}</h3>
        <h2>Sets</h2>
        <h3>{currentSetNumber} / {numberOfSets}</h3>
        <h2>Exercises</h2>
        <h3>{currentExerciseNumber} / {numberOfExercises}</h3>
        <button onClick={this.toggleTimer}>
          {timerInProgress ? 'pause' : 'start'}
        </button>
        <button onClick={() => this.resetTimer(true)}>reset</button>
      </div>
    );
  }
}

// Timer.propTypes = {
//   currentTime: PropTypes.number,
//   currentUser: PropTypes.object,
//   timerInProgress: PropTypes.bool,
//   countDownTimer: PropTypes.func,
//   onToggleInterval: PropTypes.func,
// };

export default withTracker(() => {
  const userSub = Meteor.subscribe('currentUser');
  return {
    currentUser: Meteor.user(),
    ready: userSub.ready(),
  };
})(WorkoutTimer);
