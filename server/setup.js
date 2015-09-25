Meteor.startup(() => {
  // Create an admin user if not yet present
  if (Meteor.users.find().count() === 0) {
    let adminUser = Accounts.createUser({ username: 'admin', email: 'admin@sclbl.com', password: '12345678', isAdmin: true });

    if (adminUser) {
      logger.warn('Successfully created the admin user.');
      logger.warn('NOTE: Please change the admin users password as soon as possible!');
    } else {
      logger.error('An error occurred while creating the admin user.');
    }
  }

  // Remove all modules when starting so that we have a clean state
  Modules.remove({});
  logger.info('Removed all modules to start with a clean state.');

  // Add cluster discovery functionality
  Cluster.connect(Meteor.settings.scalable.core.settings.clusterDiscoveryUrl);
  Cluster.register('scalable');
});
