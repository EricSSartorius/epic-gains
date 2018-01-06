/* eslint jsx-a11y/anchor-is-valid: 0 */
/* eslint import/no-extraneous-dependencies: 0 */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { SortableElement } from 'react-sortable-hoc';

class Workout extends Component {
  deleteThisWorkout = () => {
    Meteor.call('workouts.remove', this.props.workout._id);
  }

  goBack = () => {
    this.props.history.goBack();
  }

  renderEditMode() {
    const {
      editMode,
      workout,
      handleChange,
      handleSubmit,
    } = this.props;

    return (
      <div className="workout panel edit">
        <div className="workout-top">
          <h3>{workout.workoutName}</h3>
          <button className="icon" onClick={this.goBack}>
            <i className="fa fa-times link" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
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
        </form>
        <button className="delete" onClick={this.deleteThisWorkout}>
          Delete
        </button>
      </div>
    );
  }

  render() {
    const {
      editMode,
      editWorkout,
      handleChange,
      handleSubmit,
      workout,
    } = this.props;
    return (
      <div>
        {editMode ? (
          <div>
            {this.renderEditMode()}
          </div>
        ) : (
          <div className="workout panel" >
            <Link to={`/workouts/${workout._id}`} onClick={editWorkout} className="link">
              <div className="workout-title">
                <h3>{workout.workoutName}</h3>
                <p>({workout.workoutFocus})</p>
              </div>
              <button className="icon icon-edit" >
                <i className="fa fa-pencil link" />
              </button>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

Workout.propTypes = {
  editMode: PropTypes.bool,
  workout: PropTypes.object,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default withRouter(Workout);
