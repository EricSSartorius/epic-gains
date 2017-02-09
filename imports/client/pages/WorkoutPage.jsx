import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { autobind } from 'core-decorators';

import { Workouts } from '/imports/api/Workouts';
import Workout from '../Workout';
import WorkoutForm from '../utilities/WorkoutForm';
import Searchbar from '../utilities/Searchbar';

@autobind
class WorkoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutName: '',
      circuitWorkout: false,
      timedWorkout: false,
      noOfSets: '',
      workoutTime: '',
      workoutDescription: '',
      search: '',
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const workoutData = {
      workoutName: this.state.workoutName,
      workoutType: this.state.circuitWorkout ? 'Circuit' : 'Normal',
      timedWorkout: this.state.timedWorkout,
      noOfSets: this.state.noOfSets,
      workoutTime: this.state.workoutTime,
      workoutDescription: this.state.workoutDescription,
    };

    // Send to backend
    Meteor.call('workouts.insert', workoutData, (err, res) => {
     if(!err) {
      // Clear form
      // ** CURRENTLY ONLY CLEARS CHECKBOXES. NEEDS FIXED
      this.setState({
        workoutName: '',
        circuitWorkout: false,
        timedWorkout: false,
        noOfSets: '',
        workoutTime: '',
        workoutDescription: ''
      });
     } else {
       console.log(err);
     }
    });
  }

  renderWorkouts() {
    let filteredWorkouts = this.props.workouts.filter(
      (workout) => {
        return workout.workoutName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    );
    return filteredWorkouts.map((workout) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;

      return (
        <Workout
          key={workout._id}
          workout={workout}
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

  updateSearch(event) {
    this.setState({search: event.target.value.substr(0,20)});
  }

  render() {
    if (!this.props.ready) {
      return <div> Loading </div>
    }

    return (
      <div className ="workout-layout">
        <h1>Workouts</h1>

        { this.props.currentUser ?
          <div>
            <WorkoutForm
              handleSubmit={this.handleSubmit}
              handleInputChange={this.handleInputChange}
              workoutName={this.state.workoutName}
              circuitWorkout={this.state.circuitWorkout}
              timedWorkout={this.state.timedWorkout}
              noOfSets={this.state.noOfSets}
              workoutTime={this.state.workoutTime}
              workoutDescription={this.state.workoutDescription}
            />
            <Searchbar
              updateSearch={this.updateSearch}
              search={this.state.search}
            />
            {this.renderWorkouts()}
          </div> : ''
        }
      </div>
    )
  }
}

WorkoutPage.propTypes = {
  workouts: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(({params}) => {
  let workoutsSub = Meteor.subscribe('workouts');
  let userSub = Meteor.subscribe('currentUser');
    let workoutsArray;
    if(params.workoutId) {
      workoutsArray = Workouts.find({_id: params.workoutId}).fetch();
    } else {
      workoutsArray = Workouts.find({}, { sort: { createdAt: -1 } }).fetch();
    }
  return {
    currentUser: Meteor.user(),
    ready: workoutsSub.ready() && userSub.ready(),
    workouts: workoutsArray
  };
}, WorkoutPage);
