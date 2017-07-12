import { Exercises } from '/imports/api/Exercises'
import { Workouts } from '/imports/api/Workouts'
import { Meteor } from 'meteor/meteor'

Meteor.methods({
  'exercises.insert'(exerciseData) {
    if (! this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    Exercises.insert({
      completed: exerciseData.completed,
      createdAt: new Date(),
      exerciseDescription: exerciseData.exerciseDescription,
      exerciseName: exerciseData.exerciseName,
      exerciseTime: exerciseData.exerciseTime,
      exerciseType: exerciseData.exerciseType,
      intensity: exerciseData.intensity,
      noOfReps: exerciseData.noOfReps,
      owner: this.userId,
      timedExercise: exerciseData.timedExercise,
      username: Meteor.users.findOne(this.userId).username,
    })
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

    Exercises.update(exerciseId, { $set: {
      completed: exerciseData.completed,
      exerciseDescription: exerciseData.exerciseDescription,
      exerciseName: exerciseData.exerciseName,
      exerciseTime: exerciseData.exerciseTime,
      exerciseType: exerciseData.exerciseType,
      intensity: exerciseData.intensity,
      noOfReps: exerciseData.noOfReps,
      timedExercise: exerciseData.timedExercise,
     } })
  },
   'workouts.insert'(workoutData) {
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Workouts.insert({
      createdAt: new Date(),
      noOfSets: workoutData.noOfSets,
      owner: this.userId,
      timedWorkout: workoutData.timedWorkout,
      username: Meteor.users.findOne(this.userId).username,
      workoutDescription: workoutData.workoutDescription,
      workoutName: workoutData.workoutName,
			workoutFocus: workoutData.workoutFocus,
      workoutType: workoutData.workoutType,
      workoutTime: workoutData.workoutTime
    });
  },
  'workouts.remove'(workoutId) {
    const workout = Workouts.findOne(workoutId)

    if (workout.private && workout.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Workouts.remove(workoutId);
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

    Workouts.update(workoutId, { $set: {
      noOfSets: workoutData.noOfSets,
      timedWorkout: workoutData.timedWorkout,
      workoutDescription: workoutData.workoutDescription,
      workoutName: workoutData.workoutName,
			workoutFocus: workoutData.workoutFocus,
      workoutType: workoutData.workoutType,
      workoutTime: workoutData.workoutTime
     } })
  }
})