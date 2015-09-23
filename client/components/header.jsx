Header = React.createClass({
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
            {Meteor.userId() ? (
              <li className="u-pull-right">
                <button type="button" onClick={this.signOut}>
                  <i className="fa fa-power-off fa-lg"></i>
                </button>
              </li>
            ) : null}
          </ul>
        </div>
      </header>
    );
  }
});
