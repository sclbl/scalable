Workspace = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    const modulesSubscription = Meteor.subscribe('modules');

    return {
      modulesLoading: !modulesSubscription.ready(),
      modulesSubscription: modulesSubscription,
      modules: Modules.find({ identifier: { $nin: Meteor.user().forbiddenModulesIdentifiers } }, { sort: { name: 1 } }).fetch()
    };
  },

  getInitialState() {
    return {
      selectedModuleId: ''
    }
  },

  selectModule(module) {
    this.setState({ selectedModuleId: module._id });
  },

  render() {
    if (!this.data.modulesLoading) {
      return (
        <div>
          <div className="modules-list">
            <div className="container">
              <div className="row">
                <div className="twelve columns">
                  {this.data.modules.length ? (
                    <ol className="modules">
                      {this.data.modules.map((module, iterator) => {
                        return (
                          <li key={iterator}>
                            <a href={module.rootUrl} target="module" className={this.state.selectedModuleId === module._id ? 'button is-selected' : 'button'} onClick={this.selectModule.bind(this, module)}>{module.name}</a>
                          </li>
                        );
                      })}
                    </ol>
                  ) : <p className="text-center">There are no modules installed yet</p> }
                </div>
              </div>
            </div>
          </div>
          <iframe className="module" name="module"></iframe>
        </div>
      );
    } else {
      return (
        <Loading />
      );
    }
  }
});
