AddUser = React.createClass({
  addUser(event) {
    event.preventDefault();

    const user = {
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value,
      isAdmin: event.target['is-admin'].checked
    };

    Meteor.call('users.add', user, (error, result) => {
      if (error) {
        sweetAlert({ title: 'An error occurred', text: error.reason, timer: 2000, showConfirmButton: false });
      } else {
        FlowRouter.go('users');
      }
    });
  },

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="six columns offset-by-three">
            <form onSubmit={this.addUser}>
              <h1>Add user</h1>
              <label htmlFor="username">Username</label>
              <input id="username" type="text" className="u-full-width" placeholder="Username"/>
              <label htmlFor="email">E-Mail</label>
              <input id="email" type="email" className="u-full-width" placeholder="E-Mail"/>
              <label hthmlFor="password">Password</label>
              <input id="password" type="password" className="u-full-width" placeholder="Password"/>
              <label>
                <input id="is-admin" type="checkbox"/>
                <span className="label-body">Administrator</span>
              </label>
              <input type="submit" className="button button-primary u-full-width" value="Add user"/>
            </form>
          </div>
        </div>
      </div>
    );
  }
});
