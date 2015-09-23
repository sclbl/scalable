Header = React.createClass({
  render() {
    const homePath = FlowRouter.path('home');

    return (
      <header className="main-header">
        <div className="container">
          <ul>
            <li><a href={homePath}>Scalable</a></li>
          </ul>
        </div>
      </header>
    );
  }
});
