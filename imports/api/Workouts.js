import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import 'babel-polyfill';
import SimpleSchema from 'simpl-schema';
import './methods.js';

export const Workouts = new Mongo.Collection('workouts');

const WorkoutsSchema = new SimpleSchema({
  createdAt: {
    type: Date,
    label: 'Created At',
    autoValue() {
      return new Date();
    },
  },
  owner: {
    type: String,
    label: 'owner',
    autoValue() {
      return this.userId;
    },
  },
  username: {
    type: String,
    label: 'username',
    autoValue() {
      return Meteor.users.findOne(this.userId).username;
    },
  },
  workoutDescription: {
    type: String,
    optional: true,
  },
  workoutName: String,
  workoutFocus: {
    type: String,
    optional: true,
  },
});

Workouts.attachSchema(WorkoutsSchema);

if (Meteor.isServer) {
  Meteor.publish('workouts', function workoutsPublication() {
    return Workouts.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}
