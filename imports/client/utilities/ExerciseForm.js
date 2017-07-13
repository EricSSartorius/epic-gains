import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ExerciseForm extends Component {
  render() {
    return (
      <div className="popup">
        <button className="delete" onClick={this.props.toggleForm}>&times;</button>
        <form className="exercise-form" onSubmit={this.props.handleSubmit} >
          <input
            type="text"
            name="exerciseName"
            value={this.props.exerciseName}
            onChange={this.props.handleChange}
            placeholder="Exercise name"
          />
          <label>
            Exercise Type
            <select
              name="exerciseType"
              value={this.props.exerciseType}
              onChange={this.props.handleChange}
            >
              <option value="Hamstrings">Hamstrings</option>
              <option value="Chest">Chest</option>
              <option value="Biceps">Biceps</option>
              <option value="Triceps">Triceps</option>
              <option value="Abs">Abs</option>
              <option value="Calves">Calves</option>
              <option value="Shoulders">Shoulders</option>
              <option value="Forearms">Forearms</option>
            </select>
          </label>
          <label>
            <input
              type="checkbox"
              name="timedExercise"
              checked={this.props.timedExercise}
              onClick={this.props.handleChange}
            />
            <span>This is a timed exercise</span>
          </label>
          <input
            type="number"
            name="noOfReps"
            value={this.props.noOfReps}
            placeholder="Number of reps"
            onChange={this.props.handleChange}
          />
          <input
            type="number"
            name="exerciseTime"
            value={this.props.exerciseTime}
            placeholder="Exercise time"
            onChange={this.props.handleChange}
          />
          <input
            type="number"
            name="intensity"
            value={this.props.intensity}
            placeholder="Intensity"
            onChange={this.props.handleChange}
          />
          <textarea
            name="exerciseDescription"
            value={this.props.exerciseDescription}
            placeholder="Exercise description"
            onChange={this.props.handleChange}
          />
          <button type="submit">Create Exercise</button>
        </form>
      </div>
    )
  }
}

ExerciseForm.propTypes = {
  currentUser: PropTypes.object
}

export default ExerciseForm
