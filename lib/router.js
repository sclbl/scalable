publicAccessible = FlowRouter.group({});

signInRequired = FlowRouter.group({
  triggersEnter: [
    () => {
      if (!(Meteor.loggingIn() || Meteor.userId())) {
        FlowRouter.go('signIn');
      }
    }
  ]
});

adminRoleRequired = FlowRouter.group({
  triggersEnter: [
    () => {
      if (!(Meteor.loggingIn() || Meteor.userId())) {
        FlowRouter.go('signIn');
      } else if (Meteor.user() && !Meteor.user().isAdmin) {
        FlowRouter.go('home');
      }
    }
  ]
});

publicAccessible.route('/sign-in', {
  name: 'signIn',
  action: (params) => {
    renderMainLayoutWith(React.createElement(SignIn));
    setTitle('Sign in');
  }
});

signInRequired.route('/', {
  name: 'home',
  action: (params) => {
    renderMainLayoutWith();
    setTitle('Home');
  }
});

adminRoleRequired.route('/users', {
  name: 'users',
  action: (params) => {
    renderMainLayoutWith(React.createElement(UsersIndex));
    setTitle('Users');
  }
});

adminRoleRequired.route('/users/add', {
  name: 'addUser',
  action: (params) => {
    renderMainLayoutWith(React.createElement(AddUser));
    setTitle('Add user');
  }
});

adminRoleRequired.route('/users/:_id/update', {
  name: 'updateUser',
  action: (params) => {
    renderMainLayoutWith(React.createElement(UpdateUser));
    setTitle('Update user');
  }
});

let renderMainLayoutWith = (component) => {
  ReactLayout.render(MainLayout, {
    component: component
  });
};
