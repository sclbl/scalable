Permissions = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    const usersSubscription = Meteor.subscribe('users');
    const modulesSubscription = Meteor.subscribe('modules');

    return {
      usersLoading: !usersSubscription.ready(),
      modulesLoading: !modulesSubscription.ready(),
      usersSubscription: usersSubscription,
      modulesSubscription: modulesSubscription,
      users: Meteor.users.find({}, { sort: { username: 1 } }).fetch(),
      modules: Modules.find({}, { sort: { name: 1 } }).fetch()
    };
  },

  canUserAccessModule(user, module) {
    return !(_.contains(user.forbiddenModulesIdentifiers, module.identifier));
  },

  updatePermission(user, module) {
    Meteor.call('users.updatePermissions', { _id: user._id }, { identifier: module.identifier }, (error, result) => {
      if (error) {
        sweetAlert({ title: 'An error occurred', text: error.reason, timer: 2000, showConfirmButton: false });
      }
    });
  },

  render() {
    if (!this.data.usersLoading && !this.data.modulesLoading) {
      return (
        <div className="container">
          <div className="row">
            <div className="twelve columns">
              {this.data.users.length && this.data.modules.length ? (
                <table className="u-full-width">
                  <thead>
                  <tr>
                    <th>Username</th>
                    <th>E-Mail</th>
                    <th></th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.data.users.map((user, iterator) => {
                    return (
                      <tr key={iterator}>
                        <td>{user.username}</td>
                        <td>{user.emails[0].address}</td>
                        <td>
                          <ul className="permission-list">
                            {this.data.modules.map((module, iterator) => {
                              return (
                                <li key={iterator}>
                                  <label>
                                    {this.canUserAccessModule(user, module) ? (
                                      <input id="can-access" type="checkbox" checked onChange={this.updatePermission.bind(this, user, module)}/>
                                    ) : <input id="can-access" type="checkbox" onChange={this.updatePermission.bind(this, user, module)}/>}
                                    <span className="label-body">{module.name}</span>
                                  </label>
                                </li>
                              );
                            })}
                          </ul>
                        </td>
                      </tr>
                    );
                  })}
                  </tbody>
                </table>
              ) : <div className="alert info">Permission management is currently not possible</div> }
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
