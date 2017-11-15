/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-unresolved: 0 */
/* eslint import/extensions: 0 */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

// const audio = new Audio('/instantrapairhorn.mp3');
const audio1 = new Audio('/champ.mp3');

class WorkoutTimer extends Component {
  static propTypes = {
    numberOfExercises: PropTypes.number.isRequired,
    numberOfSets: PropTypes.number.isRequired,
    exerciseTime: PropTypes.number.isRequired,
    restTime: PropTypes.number.isRequired,
  }

  state = {
    timer: undefined,
    timerInProgress: false,
    resting: false,
    currentTime: 0,
    currentExerciseNumber: 1,
    currentSetNumber: 1,
  }

  componentDidMount() {
    this.setState({ currentTime: this.props.exerciseTime });
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
      resting,
    } = this.state;

    const {
      numberOfExercises,
      numberOfSets,
      restTime,
    } = this.props;

    if (resting) {
      this.setState({
        resting: false,
        currentExerciseNumber: 1,
      });
      this.resetTimer(false);
    } else if (currentExerciseNumber >= numberOfExercises) {
      if (currentSetNumber >= numberOfSets) {
        this.resetTimer(true);
      } else {
        this.setState({
          resting: true,
          currentTime: restTime,
          currentExerciseNumber: 1,
          currentSetNumber: currentSetNumber + 1,
        });
        audio1.play();
        this.resetTimer(false);
      }
    } else {
      this.setState({ currentExerciseNumber: currentExerciseNumber + 1 });
      audio1.play();
      this.resetTimer(false);
    }
  }

  resetTimer = (hardReset) => {
    const {
      timer,
      resting,
    } = this.state;

    const {
      exerciseTime,
      restTime,
    } = this.props;

    clearInterval(timer);
    if (hardReset) {
      this.setState({
        timer: undefined,
        timerInProgress: false,
        currentTime: exerciseTime,
        currentSetNumber: 1,
        currentExerciseNumber: 1,
        resting: false,
      });
    } else {
      const timerInterval = setInterval(this.tick, 1000);
      this.setState({
        timer: timerInterval,
        currentTime: resting ? restTime : exerciseTime,
      });
    }
  }

  render() {
    const {
      currentTime,
      currentExerciseNumber,
      currentSetNumber,
      timerInProgress,
      resting,
    } = this.state;

    const {
      numberOfExercises,
      numberOfSets,
    } = this.props;

    return (
      <div>
        <h2>Time</h2>
        <h3>{this.getTimeSpan(currentTime)}</h3>
        <h2>Sets</h2>
        <h3>{currentSetNumber} / {numberOfSets}</h3>
        <h2>Exercises</h2>
        <h3>{currentExerciseNumber} / {numberOfExercises}</h3>
        <h1>{resting && 'REST' }</h1>
        <button onClick={this.toggleTimer}>
          {timerInProgress ? 'pause' : 'start'}
        </button>
        <button onClick={() => this.resetTimer(true)}>reset</button>
      </div>
    );
  }
}

export default withTracker(() => {
  const userSub = Meteor.subscribe('currentUser');
  return {
    currentUser: Meteor.user(),
    ready: userSub.ready(),
  };
})(WorkoutTimer);
