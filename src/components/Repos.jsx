import React from 'react';
import { Link, browserHistory } from 'react-router';

class Repos extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          username: this.props.params.username
      };
    }
    componentDidMount() {
      fetch(`https://api.github.com/users/${this.state.username}/repos?sort=${this.props.location.query.sort}`)
      .then(response => response.json())
      .then(repos => {
        this.setState({
            repos: repos
        });
      });
    }
    render() {
      if (!this.state.repos) {
        return (<div className="repo-list">LOADING...</div>);
      }
      const repoList = this.state.repos.map((repo) => {
        return (
          <Link className="list-group-item list-group-item-action" id={repo.id} data-toggle="list" to={`repos/${repo.name}`} role="tab" aria-controls={repo.name} key={repo.id}>
            {repo.name}
          </Link>
        );
      });
      return(
        <div>
          <div className="navigation row">
            <a href="/" className="btn btn-default">Home</a>
            <a className="btn btn-default" onClick={browserHistory.goBack}>GitHub Username List</a>
          </div>
          <div className="sorted-by">
            <strong>Sort by:</strong>
            <a href={`/user/${this.state.username}/repos?sort=created`} className="btn btn-info sort-btn">Created</a>
            <a href={`/user/${this.state.username}/repos?sort=updated`} className="btn btn-info sort-btn">Updated</a>
            <a href={`/user/${this.state.username}/repos?sort=pushed`} className="btn btn-info sort-btn">Pushed</a>
            <a href={`/user/${this.state.username}/repos?sort=full_name`} className="btn btn-info sort-btn">Full name</a>
          </div>
          <h4>List of all repositories</h4>
          <div className="row">
            <div className="col-12">
              <div className="list-group" id="list-tab" role="tablist">
                {repoList}
              </div>
            </div>
          </div>
        </div>
      )
    }
}

export default Repos;