import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Workouts = new Mongo.Collection('workouts');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish workouts that are public or belong to the current user
  Meteor.publish('workouts', function workoutsPublication() {
    return Workouts.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'workouts.insert'(workoutName, workoutType, timedWorkout, noOfSets, workoutTime, workoutDescription) {
    check(workoutName, String);
    check(workoutType, String);
    check(timedWorkout, Boolean);
    check(noOfSets, Number);
    check(workoutTime, Number);
    check(workoutDescription, String);

    // Make sure the user is logged in before inserting a workout
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Workouts.insert({
      workoutName,
      workoutType,
      timedWorkout,
      workoutTime,
      noOfSets,
      workoutDescription,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'workouts.remove'(workoutId) {
    check(workoutId, String);

    const workout = Workouts.findOne(workoutId);
    if (workout.private && workout.owner !== this.userId) {
      // If the workout is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Workouts.remove(workoutId);
  },
  'workouts.setChecked'(workoutId, setChecked) {
    check(workoutId, String);
    check(setChecked, Boolean);

    const workout = Workouts.findOne(workoutId);
    if (workout.private && workout.owner !== this.userId) {
      // If the workout is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Workouts.update(workoutId, { $set: { checked: setChecked } });
  },
  'workouts.setPrivate'(workoutId, setToPrivate) {
    check(workoutId, String);
    check(setToPrivate, Boolean);

    const workout = Workouts.findOne(workoutId);

    // Make sure only the workout owner can make a workout private
    if (workout.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Workouts.update(workoutId, { $set: { private: setToPrivate } });
  },
  'workouts.update'(workoutId, workoutName, workoutType, timedWorkout, noOfSets, workoutTime, workoutDescription) {
    check(workoutId, String);
    check(workoutName, String);
    check(workoutType, String);
    check(timedWorkout, Boolean);
    check(noOfSets, Number);
    check(workoutTime, Number);
    check(workoutDescription, String);

    const workout = Workouts.findOne(workoutId);

    // Make sure only the workout owner can make a workout private
    if (workout.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Workouts.update(workoutId, { $set: {
       workoutName: workoutName,
       workoutType: workoutType,
       timedWorkout: timedWorkout,
       noOfSets: noOfSets,
       workoutTime: workoutTime,
       workoutDescription: workoutDescription
     } });
  },
});
