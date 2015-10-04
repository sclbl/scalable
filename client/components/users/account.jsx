Account = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      user: Meteor.user()
    };
  },

  changePassword(event) {
    event.preventDefault();

    const user = {
      oldPassword: event.target.querySelector('#old-password').value,
      newPassword: event.target.querySelector('#new-password').value
    };

    Accounts.changePassword(user.oldPassword, user.newPassword, (error, result) => {
      if (error) {
        sweetAlert({ title: 'An error occurred', text: error.reason, timer: 2000, showConfirmButton: false });
      } else {
        FlowRouter.go('workspace');
      }
    });
  },

  render() {
    if (this.data.user) {
      return (
        <div className="container">
          <div className="row">
            <div className="six columns offset-by-three">
              <form onSubmit={this.changePassword}>
                <h1>Change password</h1>
                <label htmlFor="old-password">Old Password</label>
                <input id="old-password" type="password" className="u-full-width" placeholder="Old Password"/>
                <label htmlFor="new-password">New Password</label>
                <input id="new-password" type="password" className="u-full-width" placeholder="New Password"/>
                <input type="submit" className="button button-primary u-full-width" value="Change password"/>
              </form>
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
