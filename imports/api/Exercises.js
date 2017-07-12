
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
import './methods.js'
import 'babel-polyfill'

export const Exercises = new Mongo.Collection('exercises')

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
})

Exercises.attachSchema(ExerciseSchema)

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish exercises that are public or belong to the current user
  Meteor.publish('exercises', function exercisesPublication() {
    return Exercises.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    })
  })
}