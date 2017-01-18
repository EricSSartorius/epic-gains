import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Workouts } from '../api/workouts';
import Workout from './Workout';
import WorkoutForm from './pages/WorkoutForm';

class App extends Component {

  render() {
    return (
      <div>
        <h1>Workout Home</h1>
        <button>Start a new workout</button>
        <button>Continue an existing workout</button>
      </div>
    );
  }
}

    {/* <h3>Incomplete Exercises: ({this.props.incompleteCount})</h3>
    <label className="hide-completed">
      <input
        type="checkbox"
        readOnly
        checked={this.state.hideCompleted}
        onClick={this.toggleState.bind(this, 'hideCompleted')}
      />
      Hide Completed Workouts
    </label> */}




export default createContainer(() => {
  Meteor.subscribe('workouts');

  return {
    // workouts: Workouts.find({}, { sort: { createdAt: -1 } }).fetch(),
    // incompleteCount: Workouts.find({ checked: { $ne: true } }).count(),
    // currentUser: Meteor.user(),
  };
}, App);
