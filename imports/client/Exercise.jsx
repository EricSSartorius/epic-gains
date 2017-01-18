import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

// Exercise component - represents a single exercise
export default class Exercise extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call('exercises.setChecked', this.props.exercise._id, !this.props.exercise.checked);
  }

  deleteThisExercise() {
    Meteor.call('exercises.remove', this.props.exercise._id);
  }

  togglePrivate() {
    Meteor.call('exercises.setPrivate', this.props.exercise._id, ! this.props.exercise.private);
  }

  render() {
    // Give exercises a different className when they are checked off,
    // so that we can style them nicely in CSS
    const exerciseClassName = classnames({
      checked: this.props.exercise.checked,
      private: this.props.exercise.private,
    });

    return (
      <div className={exerciseClassName}>
        <button className="delete" onClick={this.deleteThisExercise.bind(this)}>
          &times;
        </button>

        <input
          type="checkbox"
          readOnly
          checked={this.props.exercise.checked}
          onClick={this.toggleChecked.bind(this)}
        />

        { this.props.showPrivateButton ? (
          <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
            { this.props.exercise.private ? 'Private' : 'Public' }
          </button>
        ) : ''}

        <span className="text">
          <strong>{this.props.exercise.username}</strong>: {this.props.exercise.exerciseName}
        </span>
        <ul>
          <li>
            Type: {this.props.exercise.exerciseType}
          </li>
          <li>
            Time: {this.props.exercise.exerciseTime}
          </li>
          <li>
            Reps: {this.props.exercise.noOfReps}
          </li>
          <li>
            Body Part(s): {this.props.exercise.bodyPart}
          </li>
          <li>
            Intensity: {this.props.exercise.exerciseIntensity}
          </li>
          <li>
            Description: {this.props.exercise.exerciseDescription}
          </li>
        </ul>
        <button>View Exercise</button>
      </div>
    );
  }
}

Exercise.propTypes = {
  // This component gets the exercise to display through a React prop.
  // We can use propTypes to indicate it is required
  exercise: PropTypes.object.isRequired,
  showPrivateButton: PropTypes.bool.isRequired,
 };
