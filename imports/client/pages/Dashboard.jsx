import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { Workouts } from '/imports/api/Workouts';
import Workout from '../Workout';

class Dashboard extends Component {
  render() {
    return (
      <div>
        { this.props.currentUser ?
          <div>
            <h1>Epic Gains</h1>
          </div>
        :
          <div>
            <h1>Please Log in</h1>
          </div>
        }
      </div>
    );
  }
}

Dashboard.propTypes = {
  currentUser: PropTypes.object
};

export default createContainer(({params}) => {
  let userSub = Meteor.subscribe('currentUser');

  return {
    currentUser: Meteor.user(),
    ready: userSub.ready(),
  };
}, Dashboard);