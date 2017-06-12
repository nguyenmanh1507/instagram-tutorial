import React from 'react'
import ReactDOM from 'react-dom'
import {
  Router,
  Route,
  browserHistory,
} from 'react-router'
import registerServiceWorker from './registerServiceWorker'
import App from './App'
import CreatePage from './CreatePage'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/create" component={CreatePage} />
  </Router>,
  document.getElementById('root')
)
registerServiceWorker()
