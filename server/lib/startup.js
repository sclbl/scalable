Meteor.startup(() => {
  Accounts.config({ forbidClientAccountCreation: true, sendVerificationEmail: false, loginExpirationInDays: null });
});
