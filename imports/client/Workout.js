import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

 class Workout extends Component {
  deleteThisWorkout = () => {
    Meteor.call('workouts.remove', this.props.workout._id)
  }

  render() {
    if (this.props.rest) {
      return (
        <div className="rest">
          <h2>Rest</h2>
          <p>Description: Great job, grab some water!</p>
        </div>
      )
    } else {
      return (
        <Link to={'/workouts/' + this.props.workout._id}>
          <div className="workout">
            <button className="delete" onClick={this.deleteThisWorkout}>
              &times;
            </button>
            <h2>{this.props.workout.workoutName}</h2>
            <p>{this.props.workout.workoutFocus}</p>
            <p>Description: {this.props.workout.workoutDescription}</p>
          </div>
        </Link>
      )
    }
  }
}

Workout.propTypes = {
  rest: PropTypes.bool,
  workout: PropTypes.object
}

export default Workout