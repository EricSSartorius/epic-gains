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
      <form className="circuit-form panel">
        <label>
          <span>Number of Sets</span>
          <input
            className="input"
            type="number"
            name="numberOfSets"
            value={numberOfSets}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>Exercise Time</span>
          <input
            className="input"
            type="number"
            name="exerciseTime"
            value={exerciseTime}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>Rest Time Between Exercises</span>
          <input
            className="input"
            type="number"
            name="exerciseRestTime"
            value={exerciseRestTime}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>Rest Time Between Sets</span>
          <input
            className="input"
            type="number"
            name="setRestTime"
            value={setRestTime}
            onChange={handleChange}
          />
        </label>
      </form>
    );
  }
}
