Meteor.startup(() => {
  Accounts.config({ forbidClientAccountCreation: true, sendVerificationEmail: false, loginExpirationInDays: null });

  Accounts.onCreateUser((options, user) => {
    user.isAdmin = !!options.isAdmin;
    user.forbiddenModulesIdentifiers = [];
    return user;
  });
});
