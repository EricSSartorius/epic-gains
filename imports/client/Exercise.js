import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';

class Exercise extends Component {
  deleteThisExercise() {
    Meteor.call('exercises.remove', this.props.exercise._id)
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
  exercise: PropTypes.object.isRequired,
}

export default Exercise