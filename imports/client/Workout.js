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
        <p>
          <Link to ={'/workouts/' + this.props.workout._id}>View Workout</Link>
        </p>
      </div>
    )
  }
}

Workout.propTypes = {
  // This component gets the workout to display through a React prop.
  // We can use propTypes to indicate it is required
  // workout: PropTypes.object.isRequired,
}

export default Workout