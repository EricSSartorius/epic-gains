import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

class ExerciseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideCompleted: false,
      weightedExercise: false,
      timedExercise: false
    };
  }

  render() {
    return (
      <div>
        <h1>Exercise Form</h1>

        {/* <h3>Incomplete Exercises: ({this.props.incompleteCount})</h3>
        <label className="hide-completed">
          <input
            type="checkbox"
            readOnly
            checked={this.state.hideCompleted}
            onClick={this.toggleState.bind(this, 'hideCompleted')}
          />
          Hide Completed Exercises
        </label> */}
      </div>
    )
  }
}

ExerciseForm.propTypes = {

};

export default createContainer(() => {
  Meteor.subscribe('workouts');

  return {

  };
}, ExerciseForm);
