import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CircuitForm extends Component {
  render() {
    return (
      <div className="circuit-form">
        <label for="noOfSets">
          <span>Number of Sets</span>
          <input
            type="number"
            name="noOfSets"
            value={this.props.noOfSets}
            onChange={this.props.handleCircuitChange}
          />
        </label>
        <label for="exerciseTime">
          <span>Exercise Time</span>
          <input
            type="number"
            name="exerciseTime"
            value={this.props.exerciseTime}
            onChange={this.props.handleCircuitChange}
          />
        </label>
        <label for="restTime">
          <span>Rest Time</span>
          <input
            type="number"
            name="restTime"
            value={this.props.restTime}
            onChange={this.props.handleCircuitChange}
          />
        </label>
      </div>
    )
  }
}

CircuitForm.propTypes = {
  toggleCircuitForm: PropTypes.func,
  handleCircuitSubmit: PropTypes.func,
  handleCircuitChange: PropTypes.func,
  showCircuitForm: PropTypes.bool,
  noOfSets: PropTypes.number,
  exerciseTime: PropTypes.number,
  restTime: PropTypes.number,
}

export default CircuitForm
