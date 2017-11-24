import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class CircuitForm extends PureComponent {
  static propTypes = {
    numberOfSets: PropTypes.number.isRequired,
    exerciseTime: PropTypes.number.isRequired,
    exerciseRestTime: PropTypes.number.isRequired,
    setRestTime: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
  }

  render() {
    const {
      numberOfSets,
      handleChange,
      exerciseRestTime,
      exerciseTime,
      setRestTime,
    } = this.props;

    return (
      <div className="circuit-form">
        <label>
          <span>Number of Sets</span>
          <input
            type="number"
            name="numberOfSets"
            value={numberOfSets}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>Exercise Time</span>
          <input
            type="number"
            name="exerciseTime"
            value={exerciseTime}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>Rest Time Between Exercises</span>
          <input
            type="number"
            name="exerciseRestTime"
            value={exerciseRestTime}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>Rest Time Between Sets</span>
          <input
            type="number"
            name="setRestTime"
            value={setRestTime}
            onChange={handleChange}
          />
        </label>
      </div>
    );
  }
}
