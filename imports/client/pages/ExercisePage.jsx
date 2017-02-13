import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { autobind } from 'core-decorators';

import { Exercises } from '/imports/api/Exercises';
import Exercise from '../Exercise';
import ExerciseForm from '../utilities/ExerciseForm';
import Searchbar from '../utilities/Searchbar';

@autobind
class ExercisePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // showForm: false,
      completed: false,
      exerciseDescription: '',
      exerciseName: '',
      exerciseTime: '',
      exerciseType: '',
      intensity: '',
      noOfReps: '',
      timedExercise: false,
      search: '',
    };
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const exerciseData = {
      completed: this.state.completed,
      exerciseDescription: this.state.exerciseDescription,
      exerciseName: this.state.exerciseName,
      exerciseTime: this.state.exerciseTime,
      exerciseType: this.state.circuitWorkout,
      intensity: this.state.intensity,
      noOfReps: this.state.noOfSets,
      timedExercise: this.state.timedExercise
    };

    // Send to backend
    Meteor.call('exercises.insert', exerciseData, (err, res) => {
     if(!err) {
      // Clear form
      this.setState({
        // showForm: false,
        completed: false,
        exerciseDescription: '',
        exerciseName: '',
        exerciseTime: '',
        exerciseType: '',
        intensity: '',
        noOfReps: '',
        timedExercise: false,
        search: '',
      });
     } else {
       console.log(err);
     }
    });
  }

  renderExercises() {
    let filteredExercises = this.props.exercises.filter(
      (exercise) => {
        return exercise.exerciseName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    );
    return filteredExercises.map((exercise) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;

      return (
        <Exercise
          key={exercise._id}
          completed={this.state.completed}
          exercise={exercise}
        />
      );
    });
  }

  // showAll() {
  //   if(this.props.showAll) {
  //     Session.set('showAll', false);
  //   } else {
  //     Session.set('showAll', true);
  //   }
  // }

  // toggleForm() {
  //   this.setState({showForm: !this.state.showForm});
  // }

  updateSearch(event) {
    this.setState({search: event.target.value.substr(0,20)});
  }

  render() {
    if (!this.props.ready) {
      return <div> Loading </div>
    }

    return (
      <div className ="exercise-layout">
        <h1>Exercises</h1>

        { this.props.currentUser ?
          <div>
            {/* <button onClick={this.toggleForm}>{this.state.showForm ? 'Close Form':'Create New Workout'}</button> */}
            {/* { this.state.showForm ? */}
              <ExerciseForm
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                completed={this.state.completed}
                exerciseDescription={this.state.exerciseDescription}
                exerciseName={this.state.exerciseName}
                exerciseTime={this.state.exerciseTime}
                exerciseType={this.state.exerciseType}
                intensity={this.state.intensity}
                noOfReps={this.state.noOfReps}
                timedExercise={this.state.timedExercise}
              />
            {/* : null
            } */}
            <Searchbar
              updateSearch={this.updateSearch}
              search={this.state.search}
            />
            {this.renderExercises()}
          </div>
        : 'Please Log in'
        }
      </div>
    )
  }
}

ExercisePage.propTypes = {
  exercises: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(({params}) => {
  let exercisesSub = Meteor.subscribe('exercises');
  let userSub = Meteor.subscribe('currentUser');
    let exercisesArray;
    if(params.workoutId) {
      exercisesArray = Exercises.find({_id: params.exerciseId}).fetch();
    } else {
      exercisesArray = Exercises.find({}, { sort: { createdAt: -1 } }).fetch();
    }
  return {
    currentUser: Meteor.user(),
    ready: exercisesSub.ready() && userSub.ready(),
    exercises: exercisesArray
  };
}, ExercisePage);