import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import 'babel-polyfill';

import { Exercises } from '/imports/api/Exercises';

export const Workouts = new Mongo.Collection('workouts');

// const ExerciseSchema = new SimpleSchema({
// 	createdAt: {
// 		type: Date,
// 		label: "Created At",
// 		autoValue: function() {
// 			return new Date()
// 		}
// 	},
// 	completed: Boolean,
// 	exerciseDescription: {
// 		type: String,
// 		optional: true
// 	},
// 	exerciseName: {
// 		type: String,
// 		optional: true
// 	},
// 	exerciseTime: {
// 		type: Number,
// 		optional: true
// 	},
//   exerciseType: {
// 		type: String,
// 		optional: true
// 	},
// 	intensity: {
// 		type: Number,
// 		optional: true
// 	},
// 	noOfReps: {
// 		type: number,
// 		optional: true
// 	},
// 	owner: {
// 		type: String,
// 		label: "",
// 		autoValue: function() {
// 			return this.userId
// 		}
// 	},
// 	timedExercise: false,
//   username: {
//     type: String,
//     label: "username",
//     autoValue: function() {
//       return Meteor.users.findOne(this.userId).username
//     }
//   }
// });

const WorkoutsSchema = new SimpleSchema({
	createdAt: {
		type: Date,
		label: "Created At",
		autoValue: function() {
			return new Date()
		}
	},
  // exercises: {
	// 	type: ExerciseSchema,
	// 	optional: true
	// },
	noOfSets: {
		type: String,
		optional: true
	},
	owner: {
		type: String,
		label: "owner",
		autoValue: function() {
			return this.userId
		}
	},
	timedWorkout: Boolean,
	username: {
		type: String,
		label: "username",
		autoValue: function() {
			return Meteor.users.findOne(this.userId).username
		}
	},
	workoutDescription: {
		type: String,
		optional: true
	},
  workoutName: String,
  workoutTime:  {
		type: Number,
		optional: true
	},
	workoutFocus: {
		type: String,
		optional: true
	},
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
  'workouts.insert'(workoutData) {
    // Make sure the user is logged in before inserting a workout
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
  'workouts.update'(workoutData) {

    const workout = Workouts.findOne(workoutId);

    // Make sure only the workout owner can make a workout private
    if (workout.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Workouts.update(workoutId, { $set: {
      noOfSets: workoutData.noOfSets,
      timedWorkout: workoutData.timedWorkout,
      workoutDescription: workoutData.workoutDescription,
      workoutName: workoutData.workoutName,
			workoutFocus: workoutData.workoutFocus,
      workoutType: workoutData.workoutType,
      workoutTime: workoutData.workoutTime
     } });
  },
});
