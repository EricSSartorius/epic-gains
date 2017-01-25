import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import { autobind } from 'core-decorators';

// Workout component - represents a single workout
@autobind
export default class Workout extends Component {

  deleteThisWorkout() {
    Meteor.call('workouts.remove', this.props.workout._id);
  }

  togglePrivate() {
    Meteor.call('workouts.setPrivate', this.props.workout._id, ! this.props.workout.private);
    console.log(this.props.workout._id);
    console.log(this.props.workout.private);
  }

  render() {
    // Give workouts a different className when they are checked off,
    // so that we can style them nicely in CSS
    const workoutClassName = classnames({
      checked: this.props.workout.checked,
      private: this.props.workout.private,
    });

    return (
      <div className={workoutClassName}>
        <button className="delete" onClick={this.deleteThisWorkout}>
          &times;
        </button>

        { this.props.showPrivateButton ? (
          <button className="toggle-private" onClick={this.togglePrivate}>
            { this.props.workout.private ? 'Private' : 'Public' }
          </button>
        ) : ''}

        <span className="text">
          <strong>{this.props.workout.username}</strong>: {this.props.workout.workoutName}
        </span>
        <ul>
          <li>
            Type: {this.props.workout.workoutType}
          </li>
          <li>
            Time: {this.props.workout.workoutTime}
          </li>
          <li>
            Sets: {this.props.workout.noOfSets}
          </li>
          <li>
            Description: {this.props.workout.workoutDescription}
          </li>
        </ul>
        <button>View Workout</button>
      </div>
    );
  }
}

Workout.propTypes = {
  // This component gets the workout to display through a React prop.
  // We can use propTypes to indicate it is required
  workout: PropTypes.object.isRequired,
  showPrivateButton: PropTypes.bool.isRequired,
 };
