SignIn = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState() {
    return {
      email: '',
      password: ''
    };
  },

  onSubmit(event) {
    event.preventDefault();

    const email = this.state.email;
    const password = this.state.password;

    if (email.length !== 0 && password.length !== 0) {
      Meteor.loginWithPassword(email, password, (error) => {
        if (error) {
          sweetAlert({ title: 'An error occurred', text: error.reason, timer: 2000, showConfirmButton: false });
        } else {
          FlowRouter.go('workspace');
        }
      });
    }
  },

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="four columns offset-by-four">
            <form onSubmit={this.onSubmit}>
              <h1>Sign in</h1>
              <label htmlFor="email">E-Mail</label>
              <input id="email" type="email" placeholder="E-Mail" autofocus="true" className="u-full-width" valueLink={this.linkState("email")}/>
              <label htmlFor="password">Password</label>
              <input id="password" type="password" placeholder="Password" className="u-full-width" valueLink={this.linkState("password")}/>
              <input type="submit" value="Sign in" className="button-primary u-full-width"/>
            </form>
          </div>
        </div>
      </div>
    );
  }
});
