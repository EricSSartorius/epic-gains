/* eslint jsx-a11y/anchor-is-valid: 0 */
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

import { Workouts } from '/imports/api/Workouts';
import Workout from '../Workout';
import WorkoutForm from '../components/WorkoutForm';
import Searchbar from '../components/Searchbar';
import WorkoutTimer from '../components/WorkoutTimer';
import CircuitForm from '../components/CircuitForm';

import WorkoutItem from '../components/WorkoutItem';
import WorkoutList from '../components/WorkoutList';

// const SortableItem = SortableElement(({ workout }) => (
//   <div className="workout panel">
//     <Link to="/workouts/WORKOUTID" className="link">
//       {workout}
//       <div className="workout-title">
//         {/* <h3>{workout.workoutName}</h3>
//         <p>({workout.workoutFocus})</p> */}
//       </div>
//       <button className="icon icon-edit" >
//         <i className="fa fa-pencil link" />
//       </button>
//     </Link>
//   </div>
// ));

// const SortableList = SortableContainer(({ workouts }) => (
//   <div >
//     {workouts.map((workout, index) => (
//       <WorkoutItem key={`workout-${index}`} index={index} workout={workout} />
//       ))}
//   </div>
// ));

class WorkoutPage extends Component {
  state = {
    numberOfSets: 3,
    exerciseTime: 45,
    exerciseRestTime: 15,
    setRestTime: 120,
    timerInProgress: false,
    workoutName: '',
    workoutFocus: 'Whole Body',
    workoutDescription: '',
    search: '',
    showMore: false,
    // workouts: [{ workoutName: 'workout 1' }, { workoutName: 'workout 2' }, { workoutName: 'workout 3' }, { workoutName: 'workout 4' }, { workoutName: 'workout 5' }],
  };


  // onSortEnd = ({ oldIndex, newIndex }) => {
  //   // const workoutId = '';
  //   // const workoutData = '';
  //   // Meteor.call('workouts.update', workoutId, workoutData, (err, res) => {
  //   //   if (!err) {
  //   //     this.setState({
  //   //       workoutId: '',
  //   //     });
  //   //   } else {
  //   //     console.log(err);
  //   //   }
  //   // });

  //   this.setState({
  //     workouts: arrayMove(this.state.workouts, oldIndex, newIndex),
  //   });
  //   console.log('PAGE UPDATE', oldIndex, newIndex);
  // };

  handleChange = (event) => {
    let newValue = event.target.value;

    if (event.target.name === 'numberOfSets' || event.target.name === 'exerciseTime' || event.target.name === 'exerciseRestTime' || event.target.nmae === 'setRestTime') {
      newValue = parseInt(newValue);
    }

    this.setState({ [event.target.name]: newValue });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const workoutData = {
      workoutName: this.state.workoutName,
      workoutFocus: this.state.workoutFocus,
      workoutDescription: this.state.workoutDescription,
    };

    Meteor.call('workouts.insert', workoutData, (err, res) => {
      if (!err) {
        this.setState({
          workoutName: '',
          workoutFocus: 'Whole Body',
          workoutDescription: '',
        });
      } else {
        console.log(err);
      }
    });
  }

  // handleCircuitSubmit = () => {
  //   event.preventDefault()

  //   const workoutData = {
  //     workoutName: this.state.workoutName,
  //     workoutFocus: this.state.workoutFocus,
  //     workoutDescription: this.state.workoutDescription,
  //   }
  // }

  updateSearch = (event) => {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  toggleShowMore = () => {
    this.setState({ showMore: !this.state.showMore });
  }

  renderWorkouts = () => {
    const filteredWorkouts = this.props.workouts;

    filteredWorkouts.filter(workout => workout.workoutName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1);
    return filteredWorkouts.map((workout) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;

      return (
        <Workout
          key={workout._id}
          workout={workout}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      );
    });
  }

  render() {
    const {
      ready,
      currentUser,
      workouts,
    } = this.props;

    const {
      numberOfSets,
      exerciseTime,
      exerciseRestTime,
      setRestTime,
      timerInProgress,
      workoutName,
      workoutFocus,
      workoutDescription,
      search,
      showMore,
    } = this.state;

    if (!ready) {
      return (
        <div className="loading">
          <i className="fa fa-spinner fa-pulse fa-3x fa-fw white" />
          <span className="sr-only">Loading...</span>
        </div>
      );
    }

    return (
      <div className="workout-layout">
        { currentUser ? (
          <div>
            <CircuitForm
              numberOfSets={numberOfSets}
              exerciseTime={exerciseTime}
              exerciseRestTime={exerciseRestTime}
              setRestTime={setRestTime}
              handleChange={this.handleChange}
            />
            <WorkoutForm
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              workoutName={workoutName}
              workoutFocus={workoutFocus}
              workoutDescription={workoutDescription}
              showMore={showMore}
            />
            <WorkoutTimer
              numberOfExercises={workouts.length}
              numberOfSets={numberOfSets}
              exerciseTime={exerciseTime}
              exerciseRestTime={exerciseRestTime}
              setRestTime={setRestTime}
            />
            <Searchbar
              updateSearch={this.updateSearch}
              search={search}
            />
            {/* <WorkoutList workouts={this.state.workouts} onSortEnd={this.onSortEnd} />
            <br /> */}
            {this.renderWorkouts()}
          </div>
        ) : (
          <div>
            <p>Please Log in</p>
          </div>
        )}
      </div>
    );
  }
}

WorkoutPage.propTypes = {
  workouts: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};

export default withTracker((props) => {
  const workoutsSub = Meteor.subscribe('workouts');
  const userSub = Meteor.subscribe('currentUser');
  let workoutsArray;

  if (props.match.params.workoutId) {
    workoutsArray = Workouts.find({ _id: props.match.params.workoutId }).fetch();
  } else {
    workoutsArray = Workouts.find({}, { sort: { createdAt: -1 } }).fetch();
  }

  return {
    currentUser: Meteor.user(),
    ready: workoutsSub.ready() && userSub.ready(),
    workouts: workoutsArray,
  };
})(WorkoutPage);
