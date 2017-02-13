import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
// import classnames from 'classnames';
import { autobind } from 'core-decorators';
import { Link } from 'react-router';

// Exercise component - represents a single exercise
@autobind
export default class Exercise extends Component {

  deleteThisExercise() {
    Meteor.call('exercises.remove', this.props.exercise._id);
  }

  render() {
    return (
      <div className="exercise">
        <button className="delete" onClick={this.deleteThisExercise}>
          &times;
        </button>

        <span className="">
          <h2>{this.props.exercise.exerciseName}</h2>
        </span>
        <ul>
          <li>
            Intensity: {this.props.exercise.intensity}
          </li>
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
            Description: {this.props.exercise.exerciseDescription}
          </li>
        </ul>
        <p>
          <Link to ={'/exercise/' + this.props.exercise._id}>View Exercise</Link>
        </p>
      </div>
    );
  }
}

Exercise.propTypes = {
  // This component gets the exercise to display through a React prop.
  // We can use propTypes to indicate it is required
  exercise: PropTypes.object.isRequired,
};
