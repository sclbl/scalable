Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.users.find({ _id: this.userId }, { fields: { isAdmin: 1 } });
  }
});

// These publications can only be accessed when the current user is an administrator
Meteor.publish('users', function () {
  if (this.userId) {
    const currentUser = Meteor.users.findOne(this.userId);
    if (currentUser.isAdmin) {
      return Meteor.users.find({}, { sort: { username: 1 } });
    } else {
      return [];
    }
  } else {
    return [];
  }
});

Meteor.publish('user', function (_id) {
  check(_id, String);

  if (this.userId) {
    const currentUser = Meteor.users.findOne(this.userId);
    if (currentUser.isAdmin) {
      return Meteor.users.find({ _id: _id });
    } else {
      return [];
    }
  } else {
    return [];
  }
});
