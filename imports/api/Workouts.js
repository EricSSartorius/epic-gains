import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
import './methods.js'
import 'babel-polyfill'

export const Workouts = new Mongo.Collection('workouts')

const WorkoutsSchema = new SimpleSchema({
	createdAt: {
		type: Date,
		label: "Created At",
		autoValue: function() {
			return new Date()
		}
	},
	owner: {
		type: String,
		label: "owner",
		autoValue: function() {
			return this.userId
		}
	},
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
	workoutFocus: {
		type: String,
		optional: true
	},
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