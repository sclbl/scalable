Header = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user()
    };
  },

  signOut() {
    Meteor.logout();
    FlowRouter.go('signIn');
  },

  render() {
    const homePath = FlowRouter.path('home');

    return (
      <header className="main-header">
        <div className="container">
          <ul>
            <li><a href={homePath}>Scalable</a></li>
            {this.data.currentUser ? (
              <div>
                <li className="sign-out u-pull-right">
                  <button type="button" onClick={this.signOut}>
                    <i className="fa fa-power-off fa-lg"></i>
                  </button>
                </li>
                {this.data.currentUser.isAdmin ? (
                  <li className="u-pull-right">
                    <a href={FlowRouter.path('users')}><i className="fa fa-users"></i></a>
                  </li>
                ) : null}
                <li className="u-pull-right">
                  <span>{this.data.currentUser.emails[0].address}</span>
                </li>
              </div>
            ) : null}
          </ul>
        </div>
      </header>
    );
  }
});
