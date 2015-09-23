FlowRouter.route('/', {
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
