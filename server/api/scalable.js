// Methods
Meteor.methods({
  'scalable.registerModule': (module) => {
    check(module, {
      name: String,
      developer: String,
      rootUrl: String
    });

    if (!module.name) {
      throw new Meteor.Error(422, 'Name should not be blank');
    }
    if (!module.developer) {
      throw new Meteor.Error(422, 'Developer should not be blank');
    }
    if (!module.rootUrl) {
      throw new Meteor.Error(422, 'Root URL should not be blank');
    }

    // Create the identifier based on the modules developer and name
    const identifier = `${module.developer.trim().toLowerCase()}:${module.name.trim().toLowerCase()}`;

    const _id = Modules.upsert(
      { identifier: identifier },
      {
        identifier: identifier,
        name: module.name,
        rootUrl: module.rootUrl
      }
    );

    if (_id) {
      logger.info(`Module ${identifier} successfully (re) registered`);
    } else {
      const errorMessage = `Error while registering the module ${identifier}`;
      logger.error(errorMessage);
      throw new Meteor.Error(500, errorMessage);
    }
  }
});
