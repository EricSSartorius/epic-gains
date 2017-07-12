import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Workouts } from '/imports/api/Workouts'

class WorkoutForm extends Component {
  render() {
    return (
      <div className="popup">
        <button className="delete" onClick={this.props.toggleForm}>&times;</button>
        <form className ="workout-form" onSubmit={this.props.handleSubmit} >
          <input
            type="text"
            name="workoutName"
            value={this.props.workoutName}
            onChange={this.props.handleChange}
            placeholder="Workout name"
          />
          <label>
            Choose your focus
            <select
              name="workoutFocus"
              value={this.props.workoutFocus}
              onChange={this.props.handleChange}
            >
              <option value="Whole Body">Whole Body</option>
              <option value="Upper Body">Upper Body</option>
              <option value="Lower Body">Lower Body</option>
              <option value="Abs">Abs</option>
              <option value="Push">Push</option>
              <option value="Pull">Pull</option>
              <option value="Cardio">Cardio</option>
              <option value="Stretching">Stretching</option>
            </select>
          </label>
          <label>
            <input
              type="checkbox"
              name="circuitWorkout"
              checked={this.props.circuitWorkout}
              onClick={this.props.handleChange}
            />
            <span>This is a circuit workout</span>
          </label>
          <label>
            <input
              type="checkbox"
              name="timedWorkout"
              checked={this.props.timedWorkout}
              onClick={this.props.handleChange}
            />
            <span>This is a timed workout</span>
          </label>
          <input
            type="number"
            name="noOfSets"
            value={this.props.noOfSets}
            placeholder="Number of sets"
            onChange={this.props.handleChange}
          />
          <input
            type="number"
            name="workoutTime"
            value={this.props.workoutTime}
            placeholder="Workout time"
            onChange={this.props.handleChange}
          />
          <textarea
            name="workoutDescription"
            value={this.props.workoutDescription}
            placeholder="Workout description"
            onChange={this.props.handleChange}
          />
          <button type="submit">Create Workout</button>
        </form>
      </div>
    )
  }
}

WorkoutForm.propTypes = {
  currentUser: PropTypes.object
}

export default WorkoutForm
