import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import PropTypes from 'prop-types'
import { Workouts } from '/imports/api/Workouts'
import Workout from '../Workout'
import WorkoutForm from '../utilities/WorkoutForm'
import Searchbar from '../utilities/Searchbar'

class WorkoutPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false,
      workoutName: '',
      circuitWorkout: false,
      timedWorkout: false,
      noOfSets: '',
      workoutTime: '',
      workoutFocus: 'Whole Body',
      workoutDescription: '',
      search: '',
    }
  }

  handleChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({[name]: value})
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const workoutData = {
      workoutName: this.state.workoutName,
      workoutType: this.state.circuitWorkout ? 'Circuit' : 'Normal',
      timedWorkout: this.state.timedWorkout,
      noOfSets: this.state.noOfSets,
      workoutFocus: this.state.workoutFocus,
      workoutTime: this.state.workoutTime,
      workoutDescription: this.state.workoutDescription,
    }

    Meteor.call('workouts.insert', workoutData, (err, res) => {
     if(!err) {
      this.setState({showForm: false})

      this.setState({
        workoutName: '',
        circuitWorkout: false,
        timedWorkout: false,
        noOfSets: '',
        workoutFocus: 'Whole Body',
        workoutTime: '',
        workoutDescription: ''
      })
     } else {
       console.log(err)
     }
    })
  }

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
    console.log(this.props.workouts)
    if (!this.props.ready) {
      return <div> Loading </div>
    }

    return (
      <div className ="workout-layout">
        <h1>Workouts</h1>

        { this.props.currentUser ?
          <div>
            { this.state.showForm ?
              <WorkoutForm
                toggleForm={this.toggleForm}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                showForm={this.state.showForm}
                workoutName={this.state.workoutName}
                circuitWorkout={this.state.circuitWorkout}
                timedWorkout={this.state.timedWorkout}
                noOfSets={this.state.noOfSets}
                workoutTime={this.state.workoutTime}
                workoutFocus={this.state.workoutFocus}
                workoutDescription={this.state.workoutDescription}
              />
            : null
            }
            <Searchbar
              updateSearch={this.updateSearch}
              search={this.state.search}
            />
            <button className="create-new" onClick={this.toggleForm}>+ New Workout</button>
            {this.renderWorkouts()}
          </div>
        : 'Please Log in'
        }
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
