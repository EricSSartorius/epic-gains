Accounts.onCreateUser((options, user) =>
  // if(Meteor.settings.private.admins.indexOf(options.email) > -1) {
  //   user.roles = ['admin']
  // }
  user);
