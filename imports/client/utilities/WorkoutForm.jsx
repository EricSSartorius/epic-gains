import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
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
          value={this.props.value}
          onChange={this.props.handleInputChange}
          placeholder="Workout name"
        />
        <label>
          <input
            type="checkbox"
            name="circuitWorkout"
            checked={this.props.circuitWorkout}
            onClick={this.props.handleInputChange}
          />
          <span>This is a circuit workout</span>
        </label>
        <label>
          <input
            type="checkbox"
            name="timedWorkout"
            checked={this.props.timedWorkout}
            onClick={this.props.handleInputChange}
          />
          <span>This is a timed workout</span>
        </label>
        <input
          type="number"
          name="noOfSets"
          placeholder="Number of sets"
          onChange={this.props.handleInputChange}
        />
        <input
          type="number"
          name="workoutTime"
          placeholder="Workout time"
          onChange={this.props.handleInputChange}
        />
        <textarea
          name="workoutDescription"
          placeholder="Workout description"
          onChange={this.props.handleInputChange}
        />
        <button type="submit">Create Workout</button>
      </form>
    )
  }
}

WorkoutForm.propTypes = {
  currentUser: PropTypes.object,
};
