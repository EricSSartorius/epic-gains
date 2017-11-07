import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'
import { Workouts } from '/imports/api/Workouts'
import Workout from '../Workout'
import WorkoutForm from '../components/WorkoutForm'
import Searchbar from '../components/Searchbar'
import Timer from '../components/Timer'
// import CircuitForm from '../components/CircuitForm'

class WorkoutPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false,
      // noOfSets: 1,
      // exerciseTime: 60,
      // restTime: 120,
      workoutName: '',
      workoutFocus: 'Whole Body',
      workoutDescription: '',
      search: '',
    }
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const workoutData = {
      workoutName: this.state.workoutName,
      workoutFocus: this.state.workoutFocus,
      workoutDescription: this.state.workoutDescription,
    }

    Meteor.call('workouts.insert', workoutData, (err, res) => {
     if(!err) {
      this.setState({showForm: false})

      this.setState({
        workoutName: '',
        workoutFocus: 'Whole Body',
        workoutDescription: ''
      })
     } else {
       console.log(err)
     }
    })
  }

  // handleCircuitSubmit = () => {
  //   event.preventDefault()

  //   const workoutData = {
  //     workoutName: this.state.workoutName,
  //     workoutFocus: this.state.workoutFocus,
  //     workoutDescription: this.state.workoutDescription,
  //   }
  // }

  renderWorkouts() {
    let filteredWorkouts = this.props.workouts.filter(
      (workout) => {
        return workout.workoutName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      }
    )
    return filteredWorkouts.map((workout) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id

      return (
        <Workout
          key={workout._id}
          workout={workout}
        />
      )
    })
  }

  toggleForm = () => {
    this.setState({showForm: !this.state.showForm})
  }

  updateSearch = (event) => {
    this.setState({search: event.target.value.substr(0,20)})
  }

  render() {
    if (!this.props.ready) {
      return <div> Loading </div>
    }

    return (
      <div className ="workout-layout">
        { this.props.currentUser ? (
          <div>
            { this.state.showForm ?
              <WorkoutForm
                toggleForm={this.toggleForm}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                showForm={this.state.showForm}
                workoutName={this.state.workoutName}
                workoutFocus={this.state.workoutFocus}
                workoutDescription={this.state.workoutDescription}
              />
            : null
            }
            {/* <CircuitForm
              noOfSets={this.state.noOfSets}
              exerciseTime={this.state.exerciseTime}
              restTime={this.state.restTime}
            /> */}
            <Timer />
            <Searchbar
              updateSearch={this.updateSearch}
              search={this.state.search}
            />
            <button onClick={this.toggleForm}>+ New Workout</button>
            {this.renderWorkouts()}
          </div>
        ) : (
          <div>
            <p>Please Log in</p>
          </div>
        )}
      </div>
    )
  }
}

WorkoutPage.propTypes = {
  workouts: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
}

export default createContainer(({params}) => {
  let workoutsSub = Meteor.subscribe('workouts')
  let userSub = Meteor.subscribe('currentUser')
    let workoutsArray
    if(params.workoutId) {
      workoutsArray = Workouts.find({_id: params.workoutId}).fetch()
    } else {
      workoutsArray = Workouts.find({}, { sort: { createdAt: -1 } }).fetch()
    }
  return {
    currentUser: Meteor.user(),
    ready: workoutsSub.ready() && userSub.ready(),
    workouts: workoutsArray
  }
}, WorkoutPage)
