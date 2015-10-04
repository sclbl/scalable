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
    return (
      <header className="main-header">
        <div className="container">
          <ul>
            <li><a href={FlowRouter.path('workspace')}>Scalable</a></li>
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
                  <a className="email" href={FlowRouter.path('account')}>{this.data.currentUser.emails[0].address}</a>
                </li>
              </div>
            ) : null}
          </ul>
        </div>
      </header>
    );
  }
});
