import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class WorkoutForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    workoutName: PropTypes.string,
    workoutFocus: PropTypes.string,
    workoutDescription: PropTypes.string,
    toggleShowMore: PropTypes.bool,
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
      toggleShowMore,
    } = this.props;

    return (
      <div className="">
        <form className="workout-form" onSubmit={handleSubmit} >
          <input
            type="text"
            name="workoutName"
            value={workoutName}
            onChange={handleChange}
            placeholder="Workout name"
          />
          <p onClick={toggleShowMore}>Show More...
          </p>
          <div className="show-more">
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
            <textarea
              name="workoutDescription"
              value={workoutDescription}
              placeholder="Workout description"
              onChange={handleChange}
            />
            <button type="submit">Create Workout</button>
          </div>
        </form>
      </div>
    );
  }
}

export default WorkoutForm;
