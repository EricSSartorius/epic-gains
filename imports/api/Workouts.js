import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
import './methods.js'
import 'babel-polyfill'
import { Exercises } from '/imports/api/Exercises'

export const Workouts = new Mongo.Collection('workouts')

const WorkoutsSchema = new SimpleSchema({
	createdAt: {
		type: Date,
		label: "Created At",
		autoValue: function() {
			return new Date()
		}
	},
  exercises: {
		type: Exercises,
		optional: true
	},
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
})

Workouts.attachSchema(WorkoutsSchema)

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish workouts that are public or belong to the current user
  Meteor.publish('workouts', function workoutsPublication() {
    return Workouts.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    })
  })
}