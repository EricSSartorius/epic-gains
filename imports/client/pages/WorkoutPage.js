import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Workouts } from '/imports/api/Workouts';
import Workout from '../Workout';
import WorkoutForm from '../components/WorkoutForm';
import Searchbar from '../components/Searchbar';
import WorkoutTimer from '../components/WorkoutTimer';
import CircuitForm from '../components/CircuitForm';

class WorkoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noOfSets: 1,
      exerciseTime: 60,
      restTime: 120,
      currentTime: 5,
      resting: false,
      timerInProgress: false,
      workoutName: '',
      workoutFocus: 'Whole Body',
      workoutDescription: '',
      search: '',
      showMore: false,
    };
  }

  onToggleInterval = () => {
    this.setState({ timerInProgress: !this.state.timerInProgress });
  };

  checkTimer = () => {
    if (this.state.resting) {
      this.setState({ currentTime: this.state.restTime });
    } else {
      this.setState({ currentTime: this.state.exerciseTime });
    }
  }

  countDownTimer = () => {
    this.setState({ currentTime: this.state.currentTime - 1 });
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
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
    console.log(this.state.showMore);
  }

  renderWorkouts = () => {
    const filteredWorkouts = this.props.workouts;

    // filteredWorkouts.filter(workout => workout.workoutName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1);
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
    } = this.props;

    const {
      noOfSets,
      currentTime,
      exerciseTime,
      restTime,
      timerInProgress,
      workoutName,
      workoutFocus,
      workoutDescription,
      search,
      showMore,
    } = this.state;

    if (!ready) {
      return <div> Loading </div>;
    }

    return (
      <div className="workout-layout">
        { currentUser ? (
          <div>
            <CircuitForm
              noOfSets={noOfSets}
              exerciseTime={exerciseTime}
              restTime={restTime}
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
              currentTime={currentTime}
              timerInProgress={timerInProgress}
              onToggleInterval={this.onToggleInterval}
              countDownTimer={this.countDownTimer}
            />
            <Searchbar
              updateSearch={this.updateSearch}
              search={search}
            />
            {this.renderWorkouts()}
            <Workout rest />
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
