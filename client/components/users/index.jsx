UsersIndex = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      usersSubscription: Meteor.subscribe('users'),
      users: Meteor.users.find({}, { sort: { username: 1 } }).fetch()
    };
  },

  render() {
    if (this.data.users.length) {
      return (
        <div className="container">
          <div className="row">
            <div className="twelve columns">
              {this.data.users.length ? (
                <table className="u-full-width">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>E-Mail</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.data.users.map(function(user, iterator) {
                      return (
                        <tr key={iterator}>
                          <td>{user.username}</td>
                          <td>{user.emails[0].address}</td>
                          <td>{user.isAdmin ? "Administrator" : "User"}</td>
                          <td><a href={FlowRouter.path("updateUser", user)}><i className="fa fa-pencil"></i></a></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : <div className="alert info">There are no users available to display</div> }
            </div>
          </div>
          <div className="row">
            <div className="twelve columns">
              <a href={FlowRouter.path('addUser')} className="button button-primary">Add user</a>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <Loading />
      );
    }
  }
});
