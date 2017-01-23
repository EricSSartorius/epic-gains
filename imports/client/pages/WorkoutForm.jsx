import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Workouts } from '/imports/api/Workouts';
import Workout from '../Workout';

class WorkoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideCompleted: false,
      circuitWorkout: false,
      timedWorkout: false
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const workoutName = ReactDOM.findDOMNode(this.refs.workoutNameInput).value.trim();
    const workoutType = this.state.circuitWorkout ? 'Circuit' : 'Normal';
    const timedWorkout = this.state.timedWorkout;
    const noOfSets = ReactDOM.findDOMNode(this.refs.workoutSetsInput).value.trim();
    const workoutTime = ReactDOM.findDOMNode(this.refs.workoutTimeInput).value.trim();
    const workoutDescription = ReactDOM.findDOMNode(this.refs.workoutDescriptionInput).value.trim();

    // Send to backend
    Meteor.call('workouts.insert', noOfSets, timedWorkout, workoutDescription, workoutName, workoutTime, workoutType, (err, res) => {
     if(!err) {
       // Clear form
       ReactDOM.findDOMNode(this.refs.workoutNameInput).value = '';
       ReactDOM.findDOMNode(this.refs.workoutTimeInput).value = '';
       ReactDOM.findDOMNode(this.refs.workoutSetsInput).value = '';
       ReactDOM.findDOMNode(this.refs.workoutDescriptionInput).value = '';
       this.state.circuitWorkout = false;
       this.state.timedWorkout = false;
     } else {
       console.log(err);
     }
    });
  }

  toggleState(id) {
   let newState = Object.assign({}, this.state); // Getting the state object, not a reference to it as we don't want to modify state directly
   newState[id] = !this.state[id];
   this.setState(newState);
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
      <div>
        { this.props.currentUser ?
          <form className="new-workout" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="workoutNameInput"
              placeholder="Workout name"
            />
            <label>
              <input
                type="checkbox"
                checked={this.state.circuitWorkout}
                onClick={this.toggleState.bind(this, 'circuitWorkout')}
              />
              This is a circuit workout
            </label>
            <label>
              <input
                type="checkbox"
                checked={this.state.timedWorkout}
                onClick={this.toggleState.bind(this, 'timedWorkout')}
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
            <input
              type="text"
              ref="workoutDescriptionInput"
              placeholder="Workout description"
            />
            <button type="submit">Create Workout</button>
          </form> : ''
       }

       <div>
         {this.renderWorkouts()}
       </div>

      </div>
    )
  }
}

WorkoutForm.propTypes = {
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
}, WorkoutForm);
