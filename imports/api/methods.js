import { Workouts } from '/imports/api/Workouts'
import { Meteor } from 'meteor/meteor'

Meteor.methods({
  'workouts.insert'(workoutData) {
    if (! this.userId) {
      throw new Meteor.Error('not-authorized')
    }
    
    workoutData.owner = this.userId
    workoutData.username = Meteor.users.findOne(this.userId).username

    Workouts.insert(workoutData)
  },
  'workouts.remove'(workoutId) {
    const workout = Workouts.findOne(workoutId)

    if (workout.private && workout.owner !== this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    Workouts.remove(workoutId)
  },
  'workouts.setChecked'(workoutId, setChecked) {
    const workout = Workouts.findOne(workoutId)

    if (workout.private && workout.owner !== this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    Workouts.update(workoutId, { $set: { checked: setChecked } })
  },
  'workouts.setPrivate'(workoutId, setToPrivate) {
    const workout = Workouts.findOne(workoutId)

    if (workout.owner !== this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    Workouts.update(workoutId, { $set: { private: setToPrivate } })
  },
  'workouts.update'(workoutData) {
    const workout = Workouts.findOne(workoutId)

    if (workout.owner !== this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    Workouts.update(workoutId, { $set: workoutData })
  }
})