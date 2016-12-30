import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Exercise from './Exercise';
import Exercises from '../api/Exercises';

class App extends Component {
  addExercises(event) {
    event.preventDefault();
    const exerciseName = this.refs.exerciseName.value.trim();
    if(exerciseName !== '') {
      Meteor.call('insertNewExercise', exerciseName, (err, res) => {
        if(!err) {
          this.refs.exerciseName.value = '';
        }
      });
    }
  }

  showAll() {
    if(this.props.showAll) {
      Session.set('showAll', false);
    } else {
      Session.set('showAll', true);
    }
  }

  render() {
    if (!this.props.ready) {
      return <div> Loading </div>
    }

    return (
      <div>
        <header>
          <h1>Street Workout App</h1>
          <button onClick={this.showAll.bind(this)}>Show {this.props.showAll ? 'One' : 'All'}</button>

        </header>
        <main>
          <form className="new-exercises" onSubmit={this.addExercises.bind(this)}>
            <input type="text" ref='exerciseName'/>
            <button type="submit">Add Exercises</button>
          </form>
          {this.props.exercises.map((exercise) => {
            return <Exercise exercise={exercise} key={exercise._id}/>
          })}
        </main>
      </div>
    );
  }
}

export default createContainer(() => {
  let exercisesSub = Meteor.subscribe('allExercises');
  let showAll = Session.get('showAll');
  return {
    showAll,
    ready: exercisesSub.ready(),
    exercises: Exercises.find({}, {
      limit: showAll ? 50 : 1,
      sort: { lastUpdated: 1 }
    }).fetch()
  }
}, App);
