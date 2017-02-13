import React, { Component, PropTypes } from 'react';

import { autobind } from 'core-decorators';

import { Workouts } from '/imports/api/Workouts';

@autobind
export default class WorkoutForm extends Component {

  render() {
    return (
      <form className="workout-form" onSubmit={this.props.handleSubmit} >
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
    )
  }
}

WorkoutForm.propTypes = {
  currentUser: PropTypes.object,
};