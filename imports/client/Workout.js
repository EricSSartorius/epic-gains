import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

 class Workout extends Component {
  deleteThisWorkout = () => {
    Meteor.call('workouts.remove', this.props.workout._id)
  }

  render() {
    return (
      <Link to={'/workouts/' + this.props.workout._id}>
        <div className="workout">
            <button className="delete" onClick={this.deleteThisWorkout}>
              &times;
            </button>

            <span className="">
              <h2>{this.props.workout.workoutName}</h2>
            </span>
            <ul>
              <li>
                Focus: {this.props.workout.workoutFocus}
              </li>
              <li>
                Description: {this.props.workout.workoutDescription}
              </li>
            </ul>
        </div>
      </Link>
    )
  }
}

Workout.propTypes = {
  // workout: PropTypes.object.isRequired,
}

export default Workout