import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Workouts } from '../api/workouts';
import Workout from './Workout';
import AccountsUIWrapper from './AccountsUIWrapper';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
      circuitWorkout: false,
      timedWorkout: false
    };
  }

  handleWorkoutSubmit(event) {
   event.preventDefault();

   // Find the text field via the React ref
   const workoutName = ReactDOM.findDOMNode(this.refs.workoutNameInput).value.trim();
   const workoutType = this.state.circuitWorkout ? 'Circuit' : 'Normal';
   const timedWorkout = this.state.timedWorkout ? true : false;
   const noOfSets = parseInt(ReactDOM.findDOMNode(this.refs.workoutSetsInput).value.trim());
   const workoutTime = parseInt(ReactDOM.findDOMNode(this.refs.workoutTimeInput).value.trim());


   // Send to backend
   Meteor.call('workouts.insert', workoutName, workoutType, timedWorkout, noOfSets, workoutTime, (err, res) => {
     if(!err) {
       // Clear form
       ReactDOM.findDOMNode(this.refs.workoutNameInput).value = '';
       ReactDOM.findDOMNode(this.refs.workoutTimeInput).value = '';
       ReactDOM.findDOMNode(this.refs.workoutSetsInput).value = '';
       this.state.circuitWorkout = false;
       this.state.timedWorkout = false;
     }
   });
 }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted
    });
  }

  toggleCircuitWorkout() {
    this.setState({
      circuitWorkout: !this.state.circuitWorkout
    });
  }

  toggleTimedWorkout() {
    this.setState({
      timedWorkout: !this.state.timedWorkout
    });
  }

  renderWorkouts() {
    let filteredWorkouts = this.props.workouts;
    if (this.state.hideCompleted) {
      filteredWorkouts = filteredWorkouts.filter(workout => !workout.checked);
    }
    return filteredWorkouts.map((workout) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = workout.owner === currentUserId;

      return (
        <Workout
          key={workout._id}
          workout={workout}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }

  render() {
    return (
      <div className="container">
        <AccountsUIWrapper />
        <h1>Workout App</h1>
        <button>Start a new workout</button>
        <button>Continue an existing workout</button>
        { this.props.currentUser ?
          <form className="new-workout" onSubmit={this.handleWorkoutSubmit.bind(this)} >
            <input
              type="text"
              ref="workoutNameInput"
              placeholder="Workout name"
            />
            <label>
              <input
                type="checkbox"
                checked={this.state.circuitWorkout}
                onClick={this.toggleCircuitWorkout.bind(this)}
              />
              This is a circuit workout
            </label>
            <label>
              <input
                type="checkbox"
                checked={this.state.timedWorkout}
                onClick={this.toggleTimedWorkout.bind(this)}
              />
              This is a timed workout
            </label>
            <input
              type="number"
              ref="workoutSetsInput"
              placeholder="Number of sets"
            />
            <input
              type="number"
              ref="workoutTimeInput"
              placeholder="Workout time"
            />
            <button type="submit">Create Workout</button>
          </form> : ''
        }

        {/* <h3>Incomplete Exercises: ({this.props.incompleteCount})</h3>
        <label className="hide-completed">
          <input
            type="checkbox"
            readOnly
            checked={this.state.hideCompleted}
            onClick={this.toggleHideCompleted.bind(this)}
          />
          Hide Completed Workouts
        </label> */}
        <div>
          {this.renderWorkouts()}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  workouts: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  Meteor.subscribe('workouts');

  return {
    workouts: Workouts.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Workouts.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
}, App);
