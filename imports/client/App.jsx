import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { Workouts } from '../api/Workouts';
import Workout from './Workout';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Epic Gains</h1>

        {/* **below to be switched with dynamic functions */}

        {/* if no account */}
        <p>Sign up to get started</p>

        {/* if account but no workouts*/}
        <p>Create a new workout</p>
        <p>Find a workout</p>

        {/* if account and workouts exist */}
        <p>(Name of workout) is in progress, do you want to continue?</p>
      </div>
    );
  }
}

export default App;
