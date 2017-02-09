import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { autobind } from 'core-decorators';

import { Workouts } from '/imports/api/Workouts';
import Workout from '../Workout';

@autobind
class WorkoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      circuitWorkout: false,
      search: '',
      timedWorkout: false
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

    // Find the text field via the React ref
    const workoutName = ReactDOM.findDOMNode(this.refs.workoutNameInput).value.trim();
    const workoutType = this.state.circuitWorkout ? 'Circuit' : 'Normal';
    const timedWorkout = this.state.timedWorkout;
    const noOfSets = ReactDOM.findDOMNode(this.refs.workoutSetsInput).value.trim();
    const workoutTime = ReactDOM.findDOMNode(this.refs.workoutTimeInput).value.trim();
    const workoutDescription = ReactDOM.findDOMNode(this.refs.workoutDescriptionInput).value.trim();

    // Send to backend
    Meteor.call('workouts.insert', noOfSets, timedWorkout, workoutDescription, workoutName, workoutTime, workoutType, (err, res) => {
     if(!err) {
       // Clear form
       ReactDOM.findDOMNode(this.refs.workoutNameInput).value = '';
       ReactDOM.findDOMNode(this.refs.workoutTimeInput).value = '';
       ReactDOM.findDOMNode(this.refs.workoutSetsInput).value = '';
       ReactDOM.findDOMNode(this.refs.workoutDescriptionInput).value = '';
       this.state.circuitWorkout = false;
       this.state.timedWorkout = false;
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

  // toggleState(id) {
  //  let newState = Object.assign({}, this.state); // Getting the state object, not a reference to it as we don't want to modify state directly
  //  newState[id] = !this.state[id];
  //  this.setState(newState);
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
        <h1>Workout Form</h1>

        { this.props.currentUser ?
          <div>
            <form className="new-workout" onSubmit={this.handleSubmit} >
              <input
                type="text"
                ref="workoutNameInput"
                placeholder="Workout name"
              />
              <label>
                <input
                  name="circuitWorkout"
                  type="checkbox"
                  checked={this.state.circuitWorkout}
                  onClick={this.handleInputChange}
                />
                <span>This is a circuit workout</span>
              </label>
              <label>
                <input
                  name="timedWorkout"
                  type="checkbox"
                  checked={this.state.timedWorkout}
                  onChange={this.handleInputChange}
                />
                <span>This is a timed workout</span>
              </label>
              <input
                type="number"
                ref="workoutSetsInput"
                placeholder="Number of sets"
              />
              <input
                type="number"
                ref="workoutTimeInput"
                placeholder="Workout time"
              />
              <textarea
                ref="workoutDescriptionInput"
                placeholder="Workout description"
              />
              <button type="submit">Create Workout</button>
            </form>
            <div>
              {/* <p>Filter Workouts</p>
              <button onClick={this.toggleFilter.bind(this,'workoutName')}>Name</button>
              <button onClick={this.toggleFilter.bind(this,'workoutType')}>Type</button>
              <button onClick={this.toggleFilter.bind(this,'createdAt')}>Date Added</button>
              <button>Recent</button> */}
              <p>Find Workout</p>
              <input type="text"
                value={this.state.search}
                onChange={this.updateSearch.bind(this)}/>
            </div>
            <div>
              {this.renderWorkouts()}
            </div>
          </div> : ''
        }
      </div>
    )
  }
}

WorkoutForm.propTypes = {
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
}, WorkoutForm);
