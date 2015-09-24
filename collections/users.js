Meteor.methods({
  'users.add': (user) => {
    check(user, {
      username: String,
      email: String,
      password: String,
      isAdmin: Boolean
    });

    if (!Meteor.user()) {
      throw new Meteor.Error(401, 'You need to be signed in to call this method');
    }
    if (!Meteor.user().isAdmin) {
      throw new Meteor.Error(403, 'You need to be an administrator to call this method');
    }
    if (!user.username) {
      throw new Meteor.Error(422, 'Username should not be blank');
    }
    if (!user.email) {
      throw new Meteor.Error(422, 'E-Mail should not be blank');
    }
    if (!user.password) {
      throw new Meteor.Error(422, 'Password should not be blank');
    }

    Accounts.createUser({
      username: user.username,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin
    });
  },

  'users.update': (user) => {
    check(user, {
      _id: String,
      username: String,
      email: String,
      isAdmin: Boolean
    });

    if (!Meteor.user()) {
      throw new Meteor.Error(401, 'You need to be signed in to call this method');
    }
    if (!Meteor.user().isAdmin) {
      throw new Meteor.Error(403, 'You need to be an administrator to call this method');
    }
    if (!user._id) {
      throw new Meteor.Error(422, 'The users id should not be blank');
    }
    if (!user.username) {
      throw new Meteor.Error(422, 'Username should not be blank');
    }
    if (!user.email) {
      throw new Meteor.Error(422, 'E-Mail should not be blank');
    }

    Meteor.users.update(
      { _id: user._id },
      {
        $set: {
          username: user.username,
          emails: [{ address: user.email }],
          isAdmin: user.isAdmin
        }
      }
    );
  },

  'users.changePassword': (user) => {
    check(user, {
      _id: String,
      password: String
    });

    if (!Meteor.user()) {
      throw new Meteor.Error(401, 'You need to be signed in to call this method');
    }
    if (!Meteor.user().isAdmin) {
      throw new Meteor.Error(403, 'You need to be an administrator to call this method');
    }
    if (!user._id) {
      throw new Meteor.Error(422, 'The users id should not be blank');
    }
    if (!user.password) {
      throw new Meteor.Error(422, 'Password should not be blank');
    }

    // This method can only be run on the server
    if (Meteor.isServer) {
      Accounts.setPassword(user._id, user.password);
    }
  },

  'users.remove': (user) => {
    check(user, {
      _id: String
    });

    if (!Meteor.user()) {
      throw new Meteor.Error(401, 'You need to be signed in to call this method');
    }
    if (!Meteor.user().isAdmin) {
      throw new Meteor.Error(403, 'You need to be an administrator to call this method');
    }
    if (!user._id) {
      throw new Meteor.Error(422, 'The users id should not be blank');
    }
    if (user._id === Meteor.userId()) {
      throw new Meteor.Error(422, 'You can not remove yourself');
    }

    Meteor.users.remove({ _id: user._id});
  }
});
