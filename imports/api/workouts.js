import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import 'babel-polyfill';

export const Workouts = new Mongo.Collection('workouts');

const ExerciseSchema = new SimpleSchema({
	createdAt: {
		type: Date,
		label: "Created At",
		autoValue: function() {
			return new Date()
		}
	},
	exerciseDescription: {
		type: String,
		optional: true
	},
	exerciseName: {
		type: String,
		optional: true
	},
	exerciseTime: {
		type: Number,
		optional: true
	},
  exerciseType: {
		type: String,
		optional: true
	},
	intensity: {
		type: Number,
		optional: true
	},
	owner: {
		type: String,
		label: "",
		autoValue: function() {
			return this.userId
		}
	},
  // username: {
  //   type: String,
  //   label: "username",
  //   autoValue: function() {
  //     return Meteor.users.findOne(this.userId).username
  //   }
  // }
});

const WorkoutsSchema = new SimpleSchema({
	createdAt: {
		type: Date,
		label: "Created At",
		autoValue: function() {
			return new Date()
		}
	},
  exercises: {
		type: ExerciseSchema,
		optional: true
	},
	noOfSets: Number,
	owner: {
		type: String,
		label: "owner",
		autoValue: function() {
			return this.userId
		}
	},
	timedWorkout: Boolean,
	// username: {
	// 	type: String,
	// 	label: "username",
	// 	autoValue: function() {
	// 		return Meteor.users.findOne(this.userId).username
	// 	}
	// },
	workoutDescription: String,
  workoutName: String,
  workoutTime: Number,
  workoutType: String
});

Workouts.attachSchema(WorkoutsSchema);

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
  'workouts.insert'(noOfSets, timedWorkout, workoutDescription, workoutName, workoutTime, workoutType ) {

    // Make sure the user is logged in before inserting a workout
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Workouts.insert({
      createdAt: new Date(),
      noOfSets,
      owner: this.userId,
      timedWorkout,
      // username: Meteor.users.findOne(this.userId).username,
      workoutDescription,
      workoutName,
      workoutType,
      workoutTime
    });
  },
  'workouts.remove'(workoutId) {

    const workout = Workouts.findOne(workoutId);
    if (workout.private && workout.owner !== this.userId) {
      // If the workout is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Workouts.remove(workoutId);
  },
  'workouts.setChecked'(workoutId, setChecked) {

    const workout = Workouts.findOne(workoutId);
    if (workout.private && workout.owner !== this.userId) {
      // If the workout is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Workouts.update(workoutId, { $set: { checked: setChecked } });
  },
  'workouts.setPrivate'(workoutId, setToPrivate) {

    const workout = Workouts.findOne(workoutId);

    // Make sure only the workout owner can make a workout private
    if (workout.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Workouts.update(workoutId, { $set: { private: setToPrivate } });
  },
  'workouts.update'(workoutId, noOfSets, timedWorkout, workoutDescription, workoutName, workoutType,  workoutTime) {

    const workout = Workouts.findOne(workoutId);

    // Make sure only the workout owner can make a workout private
    if (workout.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Workouts.update(workoutId, { $set: {
      noOfSets: noOfSets,
      timedWorkout: timedWorkout,
      workoutDescription: workoutDescription,
      workoutName: workoutName,
      workoutType: workoutType,
      workoutTime: workoutTime
     } });
  },
});
