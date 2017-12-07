import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class WorkoutForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    workoutName: PropTypes.string,
    workoutFocus: PropTypes.string,
    workoutDescription: PropTypes.string,
  }

  static defaultProps = {
    workoutName: '',
    workoutFocus: 'Whole Body',
    workoutDescription: '',
  }

  render() {
    const {
      handleSubmit,
      handleChange,
      workoutName,
      workoutFocus,
      workoutDescription,
    } = this.props;

    return (
      <form className="workout-form panel" onSubmit={handleSubmit} >
        <label htmlFor="workoutName">
        Workout Name
          <input
            className="input"
            type="text"
            name="workoutName"
            value={workoutName}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="workoutFocus">
          Focus
          <select
            name="workoutFocus"
            value={workoutFocus}
            onChange={handleChange}
          >
            <option value="Whole Body">Whole Body</option>
            <option value="Upper Body">Upper Body</option>
            <option value="Lower Body">Lower Body</option>
            <option value="Core">Core</option>
            <option value="Stretching">Stretching</option>
          </select>
        </label>
        <label htmlFor="workoutDescription">
          Workout Description
          <textarea
            name="workoutDescription"
            value={workoutDescription}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="add">+ Add Exercise</button>
      </form>
    );
  }
}
