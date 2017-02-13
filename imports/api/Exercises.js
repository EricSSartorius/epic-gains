
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import 'babel-polyfill';

export const Exercises = new Mongo.Collection('exercises');

const ExerciseSchema = new SimpleSchema({
	createdAt: {
		type: Date,
		label: "Created At",
		autoValue: function() {
			return new Date()
		}
	},
	completed: Boolean,
	exerciseDescription: {
		type: String,
		optional: true
	},
	exerciseName: {
		type: String,
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
	noOfReps: {
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
	timedExercise: Boolean,
  username: {
    type: String,
    label: "username",
    autoValue: function() {
      return Meteor.users.findOne(this.userId).username
    }
  }
});

Exercises.attachSchema(ExerciseSchema);

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
  'exercises.insert'(exerciseData) {
    // Make sure the user is logged in before inserting an exercise
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
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
    });
  },
  'exercises.remove'(exerciseId) {

    const exercise = Exercises.findOne(exerciseId);
    if (exercise.private && exercise.owner !== this.userId) {
      // If the exercise is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Exercises.remove(exerciseId);
  },
  'exercises.setChecked'(exerciseId, setChecked) {

    const exercise = Exercises.findOne(exerciseId);
    if (exercise.private && exercise.owner !== this.userId) {
      // If the exercise is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Exercises.update(exerciseId, { $set: { checked: setChecked } });
  },
  'exercises.setPrivate'(exerciseId, setToPrivate) {

    const exercise = Exercises.findOne(exerciseId);

    // Make sure only the exercise owner can make a exercise private
    if (exercise.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Exercises.update(exerciseId, { $set: { private: setToPrivate } });
  },
  'exercises.update'(exerciseData) {

    const exercise = Exercises.findOne(exerciseId);

    // Make sure only the exercise owner can make a exercise private
    if (exercise.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
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
     } });
  },
});
