import React from 'react';
import { browserHistory } from 'react-router';

class RepoDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: window.location.href.split('/')[window.location.href.split('/').length - 3]
        };
        this._fetchAllContributors = this._fetchAllContributors.bind(this);
    }
    _fetchAllContributors() {
        fetch(`https://api.github.com/repos/${this.state.username}/${this.props.params.reponame}/contributors`)
        .then(response => response.json())
        .then(contributors => {
            this.setState({
                contributors: contributors
            });
        });
    }
    componentDidMount() {
        fetch(`https://api.github.com/repos/${this.state.username}/${this.props.params.reponame}`)
        .then(response => response.json())
        .then(repo => {
            this.setState({
                repo: repo
            });
        });
    }
    render() {
        if (!this.state.repo) {
            return (<div className="repo-list">LOADING...</div>);
        }
        const repoDetails = this.state.repo;
        let allContributors;
        if (this.state.contributors) {
            allContributors = this.state.contributors.map(contributor => {
                return (
                    <div className="col-3" key={contributor.id}>
                        <div className="card">
                            <img className="card-img-top" src={contributor.avatar_url} alt={contributor.login} />
                            <div className="card-body">
                                <h5 className="card-title">{contributor.login}</h5>
                                <p className="card-text">Total contributions done so far: {contributor.contributions}</p>
                                <a href={contributor.html_url} target="_blank" className="btn btn-primary">Checkout contributor's profile</a>
                            </div>
                        </div>
                    </div>
                )
            });
        }
        return(
            <div>
                <button className="btn btn-default navigation" onClick={browserHistory.goBack}>Go Back</button>
                <h1>{repoDetails.name}</h1>
                <h5>{repoDetails.description}</h5>
                <button className="btn btn-success" onClick={this._fetchAllContributors}>See all contributers</button>
                <div className="row">
                    {this.state.contributors ? allContributors : ''}
                </div>
            </div>
        )
    }
}

export default RepoDetail;