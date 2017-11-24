import { Workouts } from './Workouts';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
  'workouts.insert': function (workoutData) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Workouts.insert(workoutData);
  },
  'workouts.remove': function (workoutId) {
    const workout = Workouts.findOne(workoutId);

    if (workout.private && workout.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Workouts.remove(workoutId);
  },
  'workouts.setChecked': function (workoutId, setChecked) {
    const workout = Workouts.findOne(workoutId);

    if (workout.private && workout.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Workouts.update(workoutId, { $set: { checked: setChecked } });
  },
  // 'workouts.setPrivate': function(workoutId, setToPrivate) {
  //   const workout = Workouts.findOne(workoutId);

  //   if (workout.owner !== this.userId) {
  //     throw new Meteor.Error('not-authorized');
  //   }
  //   Workouts.update(workoutId, { $set: { private: setToPrivate } });
  // },
  'workouts.update': function (workoutId, workoutData) {
    const workout = Workouts.findOne(workoutId);

    if (workout.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Workouts.update(workoutId, { $set: workoutData });
  },
});
