import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'
import Timer from '../utilities/Timer'

class TimerPage extends Component {
  render() {
    return (
      <div>
        <h1>Timer Page</h1>
        <Timer />
      </div>
    )
  }
}

export default createContainer(({params}) => {
  let userSub = Meteor.subscribe('currentUser')
  return {
    currentUser: Meteor.user(),
    ready: userSub.ready(),
  };
}, TimerPage)
