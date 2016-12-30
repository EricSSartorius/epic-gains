import React, { Component } from 'react';
import Exercises from '../api/Exercises';

export default class Exercise extends Component {
  voteName() {
    Meteor.call('voteOnExercise', this.props.exercise, 'exerciseName');
  }

  render() {
      return (
        <div className="exercise">
          <div className= 'vote-name' onClick={this.voteName.bind(this)}>
            <span>{this.props.exercise.exerciseName.value}</span>
            <h3>
              {this.props.exercise.exerciseName.text}
            </h3>
          </div>
        </div>
      )
  }
}
