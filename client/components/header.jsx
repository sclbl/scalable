Header = React.createClass({
  signOut() {
    Meteor.logout();
    FlowRouter.go('signIn');
  },

  emailAddress() {
    return Meteor.user() && Meteor.user().emails && Meteor.user().emails[0].address
  },

  render() {
    const homePath = FlowRouter.path('home');

    return (
      <header className="main-header">
        <div className="container">
          <ul>
            <li><a href={homePath}>Scalable</a></li>
            {Meteor.userId() ? (
              <div>
                <li className="sign-out u-pull-right">
                  <button type="button" onClick={this.signOut}>
                    <i className="fa fa-power-off fa-lg"></i>
                  </button>
                </li>
                <li className="u-pull-right">
                  <span>{this.emailAddress()}</span>
                </li>
              </div>
            ) : null}
          </ul>
        </div>
      </header>
    );
  }
});
