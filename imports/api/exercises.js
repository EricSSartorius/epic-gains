import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Exercises = new Mongo.Collection('exercises');

// Schemas
// ExerciseSchema = new SimpleSchema({
// 	name: {
// 		type: String,
//     label: "exercise name"
// 	},
// 	time: {
// 		type: Number,
//     label: "Time"
// 	},
//   desc: {
//     type: String,
//     label: "Description"
//   },
//   intensity: {
//     type: Number,
//     label: "Intensity"
//   },
// });
//
// ExerciseSchema = new SimpleSchema({
// 	name: {
// 		type: String,
// 		label: "exercise name"
// 	},
//   exerciseType: {
//     type: String,
//     label: "exercise type"
//   },
// 	exercises: {
// 		type: [ExerciseSchema]
// 	},
// 	author: {
// 		type: String,
// 		label: "author",
// 		autoValue: function() {
// 			return this.userId
// 		}
// 	},
// 	createdAt: {
// 		type: Date,
// 		label: "Created At",
// 		autoValue: function() {
// 			return new Date()
// 		}
// 	}
// });

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish exercises that are public or belong to the current user
  Meteor.publish('exercises', function exercisesPublication() {
    return Exercises.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'exercises.insert'(exerciseName, exerciseType, timedExercise, noOfSets, exerciseTime) {
    check(exerciseName, String);
    check(exerciseType, String);
    check(timedExercise, Boolean);
    check(noOfSets, Number);
    check(exerciseTime, Number);

    // Make sure the user is logged in before inserting a exercise
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Exercises.insert({
      exerciseName,
      exerciseType,
      timedExercise,
      exerciseTime,
      noOfReps,
      bodyPart,
      exerciseIntensity,
      exerciseDescription,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'exercises.remove'(exerciseId) {
    check(exerciseId, String);

    const exercise = Exercises.findOne(exerciseId);
    if (exercise.private && exercise.owner !== this.userId) {
      // If the exercise is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Exercises.remove(exerciseId);
  },
  'exercises.setChecked'(exerciseId, setChecked) {
    check(exerciseId, String);
    check(setChecked, Boolean);

    const exercise = Exercises.findOne(exerciseId);
    if (exercise.private && exercise.owner !== this.userId) {
      // If the exercise is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Exercises.update(exerciseId, { $set: { checked: setChecked } });
  },
  'exercises.setPrivate'(exerciseId, setToPrivate) {
    check(exerciseId, String);
    check(setToPrivate, Boolean);

    const exercise = Exercises.findOne(exerciseId);

    // Make sure only the exercise owner can make a exercise private
    if (exercise.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Exercises.update(exerciseId, { $set: { private: setToPrivate } });
  },
  'exercises.update'(exerciseId, exerciseName, exerciseType, timedExercise, noOfSets, exerciseTime) {
    check(exerciseId, String);
    check(exerciseName, String);
    check(exerciseType, String);
    check(timedExercise, Boolean);
    check(noOfSets, Number);
    check(exerciseTime, Number);

    const exercise = Exercises.findOne(exerciseId);

    // Make sure only the exercise owner can make a exercise private
    if (exercise.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Exercises.update(exerciseId, { $set: {
       exerciseName: exerciseName,
       exerciseType: exerciseType,
       timedExercise: timedExercise,
       noOfSets: noOfSets,
       exerciseTime: exerciseTime,
     } });
  },
});
