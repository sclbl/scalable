SignIn = React.createClass({
  signIn(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

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
            <form onSubmit={this.signIn}>
              <h1>Sign in</h1>
              <label htmlFor="email">E-Mail</label>
              <input id="email" type="email" placeholder="E-Mail" autofocus="true" className="u-full-width"/>
              <label htmlFor="password">Password</label>
              <input id="password" type="password" placeholder="Password" className="u-full-width"/>
              <input type="submit" value="Sign in" className="button-primary u-full-width"/>
            </form>
          </div>
        </div>
      </div>
    );
  }
});
