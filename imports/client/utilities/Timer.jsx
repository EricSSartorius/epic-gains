import React, { Component, PropTypes } from 'react';

export default class Timer extends Component {

  render() {
    return (
      <div>
        <h1>TIMER</h1>
      </div>
    )
  }
}

Timer.propTypes = {
  currentUser: PropTypes.object,
};
