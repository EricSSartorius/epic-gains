/* eslint jsx-a11y/anchor-is-valid: 0 */
/* eslint import/no-extraneous-dependencies: 0 */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Workout extends Component {
  deleteThisWorkout = () => {
    Meteor.call('workouts.remove', this.props.workout._id);
  }

  editThisWorkout = () => {
    console.log('Edit');
  }

  render() {
    const {
      workout,
      handleChange,
      handleSubmit,
    } = this.props;

    return (
      <div className="workout panel">
        <button className="delete" onClick={this.deleteThisWorkout}>
          &times;
        </button>
        <button onClick={this.editThisWorkout}>Edit</button>
        <Link to={`/workouts/${workout._id}`}>
          <h2>{this.props.workout.workoutName}</h2>
        </Link>
        {/* <form onSubmit={handleSubmit}>
          <label htmlFor="workoutFocus">
            Focus
              <select
                name="workoutFocus"
                value={workout.workoutFocus}
                onChange={this.handleChange}
              >
                <option value="Whole Body">Whole Body</option>
                <option value="Upper Body">Upper Body</option>
                <option value="Lower Body">Lower Body</option>
                <option value="Core">Core</option>
                <option value="Stretching">Stretching</option>
              </select>
          </label>
          <textarea
            name="workoutDescription"
            value={workout.workoutDescription}
            placeholder="Workout description"
            onChange={handleChange}
          />
          <button type="submit">Update</button>
        </form> */}
      </div>
    );
  }
}

Workout.propTypes = {
  workout: PropTypes.object,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default Workout;
