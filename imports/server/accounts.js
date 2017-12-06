import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Accounts.onCreateUser((options, user) => {
  if (Meteor.settings.private.admins.indexOf(options.email) > -1) {
    console.log(options, user);
    user.roles = ['admin'];
  }
  return user;
});

//  Meteor.loginWithFacebook({
//   requestPermissions: ['public_profile', 'email'],
// }, (err) => {
//   if (err) {
//     console.log(err);
//     // handle error
//   } else {
//     console.log('SUCCESS');
//     // successful login!
//   }
// });
