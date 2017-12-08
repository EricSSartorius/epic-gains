import React, { Component } from 'react';
import PropTypes from 'prop-types';

// const audio = new Audio('/instantrapairhorn.mp3');
const audio1 = new Audio('/champ.mp3');

export default class WorkoutTimer extends Component {
  static propTypes = {
    numberOfExercises: PropTypes.number.isRequired,
    numberOfSets: PropTypes.number.isRequired,
    exerciseTime: PropTypes.number.isRequired,
    exerciseRestTime: PropTypes.number.isRequired,
    setRestTime: PropTypes.number.isRequired,
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
      this.setState({
        resting: !this.state.resting,
      }, () => {
        this.resetCheck();
      });
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
    } = this.props;

    let hardReset = false;
    audio1.play();

    if (resting) {
      return this.resetTimer(hardReset);
    } else if (currentExerciseNumber >= numberOfExercises) {
      if (currentSetNumber >= numberOfSets) {
        hardReset = true;
      } else {
        this.setState({
          currentExerciseNumber: 1,
          currentSetNumber: currentSetNumber + 1,
        });
      }
    } else {
      this.setState({ currentExerciseNumber: currentExerciseNumber + 1 });
    }
    return this.resetTimer(hardReset);
  }

  resetTimer = (hardReset) => {
    const {
      timer,
      resting,
      currentExerciseNumber,
    } = this.state;

    const {
      exerciseTime,
      exerciseRestTime,
      setRestTime,
      numberOfExercises,
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
      const restTime = currentExerciseNumber >= numberOfExercises ? setRestTime : exerciseRestTime;

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
      <div className="workout-timer panel">
        <div className="timer-top">
          <div className="sets">
            <h2>Sets</h2>
            <h3 className="number">{currentSetNumber} / {numberOfSets}</h3>
          </div>
          <div className="exercises">
            <h2>Exercises</h2>
            <h3 className="number">{currentExerciseNumber} / {numberOfExercises}</h3>
          </div>
        </div>
        <div className="timer-middle">
          <h2>Exercise Time Remaining</h2>
          <h1 className="number">{this.getTimeSpan(currentTime)}</h1>
        </div>
        {resting &&
          <div className="timer-rest">
            <h1 className="number">REST</h1>
          </div>
        }
        <div className="timer-buttons">

          <button onClick={this.toggleTimer}>
            {timerInProgress ? 'pause' : 'start'}
          </button>
          <button onClick={() => this.resetTimer(true)}>reset</button>
        </div>
        {timerInProgress &&
          <div className="timer-exercises">
            <div className="current">
              <h2>CURRENT</h2>
            </div>
            <div className="next">
              <h2>NEXT</h2>
            </div>
          </div>
        }
      </div>
    );
  }
}
