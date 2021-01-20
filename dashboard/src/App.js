import React, { lazy } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'

// import LoginPage from './pages/LoginPage';

const Layout = lazy(() => import('./containers/Layout'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const CreateAccount = lazy(() => import('./pages/CreateAccount'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))

const App = () => {
  return (
    <Router>
      <AccessibleNavigationAnnouncer />
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/create-account" component={CreateAccount} />
        <Route path="/forgot-password" component={ForgotPassword} />

        {/* Place new routes over this */}
        <Route path="/app" component={Layout} />
        {/* If you have an index page, you can remothis Redirect */}
        <Redirect exact from="/" to="/login" />
      </Switch>
    </Router>
  )
}

export default App
