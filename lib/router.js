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

let renderMainLayoutWith = (component) => {
  ReactLayout.render(MainLayout, {
    component: component
  });
};
