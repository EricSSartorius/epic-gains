import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { Workouts } from '../api/Workouts';
import Workout from './Workout';
import WorkoutForm from './pages/WorkoutForm';

class App extends Component {
  render() {
    if (!this.props.ready) {
      return <div> Loading </div>
    }

    return (
      <div>
        <h1>Workout Home</h1>
        <button>Start a new workout</button>
        <button>Continue an existing workout</button>
      </div>
    );
  }
}

export default createContainer(({params}) => {
  let workoutsSub = Meteor.subscribe('workouts');
  let userSub = Meteor.subscribe('currentUser');
  // let showAll = Session.get('showAll');
  let workoutsArray;
  if(params.id) {
    workoutsArray = Workouts.find({_id: params.id}).fetch();
  } else {
    workoutsArray = Workouts.find({}, {
      // limit: showAll ? 50 : 1,
      sort: { lastUpdated: 1 }
    }).fetch()
  }
  return {
    // showAll,
    ready: workoutsSub.ready() && userSub.ready(),
    items: workoutsArray
  }
}, App);
