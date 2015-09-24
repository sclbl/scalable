UpdateUser = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      userSubscription: Meteor.subscribe('user', FlowRouter.getParam('_id')),
      user: Meteor.users.findOne({ _id: FlowRouter.getParam('_id') })
    };
  },

  updateUser(event) {
    event.preventDefault();

    const user = {
      _id: this.data.user._id,
      username: event.target.username.value,
      email: event.target.email.value,
      isAdmin: event.target['is-admin'].checked
    };

    Meteor.call('users.update', user, (error, result) => {
      if (error) {
        sweetAlert({ title: 'An error occurred', text: error.reason, timer: 2000, showConfirmButton: false });
      } else {
        FlowRouter.go('users');
      }
    });
  },

  changePassword(event) {
    event.preventDefault();

    const user = {
      _id: this.data.user._id,
      password: event.target.password.value
    };

    Meteor.call('users.changePassword', user, (error, result) => {
      if (error) {
        sweetAlert({ title: 'An error occurred', text: error.reason, timer: 2000, showConfirmButton: false });
      } else {
        FlowRouter.go('users');
      }
    });
  },

  removeUser() {
    const user = {
      _id: this.data.user._id
    };

    sweetAlert({
      title: 'Remove user',
      text: 'Do you really want to remove this user? This is a destructive action and can not be undone!',
      showCancelButton: true,
      confirmButtonColor: '#A94442',
      confirmButtonText: 'Remove user',
      closeOnConfirm: true },
      () => {
        Meteor.call('users.remove', user, (error, result) => {
          if (error) {
            sweetAlert({ title: 'An error occurred', text: error.reason, timer: 2000, showConfirmButton: false });
          } else {
            FlowRouter.go('users');
          }
        });
      });
  },

  render() {
    if (this.data.user) {
      return (
        <div className="container">
          <div className="row">
            <div className="six columns offset-by-three">
              <form onSubmit={this.updateUser}>
                <h1>Update user</h1>
                <label htmlFor="username">Username</label>
                <input id="username" type="text" className="u-full-width" placeholder="Username" defaultValue={this.data.user.username}/>
                <label htmlFor="email">E-Mail</label>
                <input id="email" type="email" className="u-full-width" placeholder="E-Mail" defaultValue={this.data.user.emails[0].address}/>
                <label>
                  <input id="is-admin" type="checkbox" defaultChecked={this.data.user.isAdmin}/>
                  <span className="label-body">Administrator</span>
                </label>
                <input type="submit" className="button button-primary u-full-width" value="Update user"/>
              </form>

              <hr />

              <form onSubmit={this.changePassword}>
                <h1>Change password</h1>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" className="u-full-width" placeholder="Password"/>
                <input type="submit" className="button button-primary u-full-width" value="Change password"/>
              </form>

              <hr />

              <button type="button" className="button u-full-width" onClick={this.removeUser}>Remove user</button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="row">
            <div className="twelve columns">
              <p className="text-center">Loading...</p>
            </div>
          </div>
        </div>
      );
    }
  }
});
