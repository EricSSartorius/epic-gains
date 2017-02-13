import React, { Component, PropTypes } from 'react';

import { autobind } from 'core-decorators';

import { Exercises } from '/imports/api/Exercises';

@autobind
export default class ExerciseForm extends Component {

  render() {
    return (
      <form className="exercise-form" onSubmit={this.props.handleSubmit} >
        <input
          type="text"
          name="exerciseName"
          value={this.props.exerciseName}
          onChange={this.props.handleChange}
          placeholder="Exercise name"
        />
        <label>
          Choose your focus
          <select
            name="exerciseType"
            value={this.props.exerciseType}
            onChange={this.props.handleChange}
          >
            <option value="Whole Body">Hamstrings</option>
            <option value="Upper Body">Chest</option>
            <option value="Lower Body">Biceps</option>
            <option value="Abs">Triceps</option>
            <option value="Push">Abs</option>
            <option value="Pull">Calves</option>
            <option value="Cardio">Shoulders</option>
            <option value="Stretching">Forearms</option>
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
    )
  }
}

ExerciseForm.propTypes = {
  currentUser: PropTypes.object,
};
