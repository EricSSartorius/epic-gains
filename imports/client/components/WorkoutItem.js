/* eslint jsx-a11y/anchor-is-valid: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { SortableElement } from 'react-sortable-hoc';

class WorkoutItem extends Component {
  state = {
  }
  render() {
    const { workout } = this.props;

    return (
      <div className="workout panel">
        <Link to="/workouts/WORKOUTID" className="link">
          <div className="workout-title">
            <h3>{workout.workoutName}</h3>
            <p>({workout.workoutFocus})</p>
          </div>
          <button className="icon icon-edit" >
            <i className="fa fa-pencil link" />
          </button>
        </Link>
      </div>
    );
  }
}

export default SortableElement(WorkoutItem);
