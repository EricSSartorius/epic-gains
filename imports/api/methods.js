import { Exercises } from '/imports/api/Exercises'
import { Workouts } from '/imports/api/Workouts'
import { Meteor } from 'meteor/meteor'

Meteor.methods({
  'exercises.insert'(exerciseData) {
    if (! this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    exerciseData.owner = this.userId
    exerciseData.username = Meteor.users.findOne(this.userId).username

    Exercises.insert(exerciseData)
  },
  'exercises.remove'(exerciseId) {
    const exercise = Exercises.findOne(exerciseId)

    if (exercise.private && exercise.owner !== this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    Exercises.remove(exerciseId)
  },
  'exercises.setChecked'(exerciseId, setChecked) {
    const exercise = Exercises.findOne(exerciseId)

    if (exercise.private && exercise.owner !== this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    Exercises.update(exerciseId, { $set: { checked: setChecked } })
  },
  'exercises.setPrivate'(exerciseId, setToPrivate) {
    const exercise = Exercises.findOne(exerciseId)

    if (exercise.owner !== this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    Exercises.update(exerciseId, { $set: { private: setToPrivate } })
  },
  'exercises.update'(exerciseData) {
    const exercise = Exercises.findOne(exerciseId)

    if (exercise.owner !== this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    Exercises.update(exerciseId, { $set: exerciseData })
  },
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