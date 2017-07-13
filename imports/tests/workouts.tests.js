/* eslint-env mocha */

import { Meteor } from 'meteor/meteor'
import { Random } from 'meteor/random'
import { assert } from 'meteor/practicalmeteor:chai'

import { Workouts } from './workouts'

if (Meteor.isServer) {
  describe('Workouts', () => {
    describe('methods', () => {
      const userId = Random.id()
      let workoutId

      beforeEach(() => {
        Workouts.remove({})
        workoutId = Workouts.insert({
          text: 'test workout',
          createdAt: new Date(),
          owner: userId,
          username: 'tmeasday',
        })
      })

      it('can delete owned workout', () => {
        // Find the internal implementation of the workout method so we can
        // test it in isolation
        const deleteWorkout = Meteor.server.method_handlers['workouts.remove']

        // Set up a fake method invocation that looks like what the method expects
        const invocation = { userId }

        // Run the method with `this` set to the fake invocation
        deleteWorkout.apply(invocation, [workoutId])

        // Verify that the method does what we expected
        assert.equal(Workouts.find().count(), 0)
      })
    })
  })
}
