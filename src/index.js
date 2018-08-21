import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import Search from './components/Search';
import User from './components/User';
import Repos from './components/Repos';
import RepoDetail from './components/RepoDetail';

import './assets/stylesheets/index.css';

const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={ App }>
            <IndexRoute component={ Search } />
            <Route path="user/:username" component={ User } />
            <Route path="user/:username/repos" component={ Repos } />
            <Route path="repos/:reponame" component={ RepoDetail } />
        </Route>
    </Router>
);

ReactDOM.render(routes, document.getElementById('root'));
