import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
  toggleForm: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  showForm: PropTypes.bool,
  workoutName: PropTypes.string,
  workoutFocus: PropTypes.string,
  workoutDescription: PropTypes.string
}

export default WorkoutForm
