import { Mongo } from 'meteor/mongo';

const Exercises = new Mongo.Collection('exercises');

if(Meteor.isServer) {

  Meteor.publish('allExercises', function() {
    return Exercises.find({}, {
      limit: 50,
      sort: { lastUpdated: 1 }
    });
  });

  Meteor.methods({
    insertNewExercise(exerciseName) {
      check(exerciseName, String);
      Exercises.insert({
        exerciseName: {
          text: exerciseName,
          value: 0
        }
      });
    },
    voteOnExercise(exercise, position) {
      check(exercise, Object);
      let lastUpdated = new Date();
      Exercises.update(exercise._id, {
        $inc: {
          'exerciseName.value': 1
        },
        $set: {
          lastUpdated
        }
      })
    }
  });
}

export default Exercises;
