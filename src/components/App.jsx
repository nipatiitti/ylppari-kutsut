/**
 * Main container
 *
 * @author name <Niilo.jaakkola@icloud.com>
 *
 *
 */

import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'

// components
import { ProtectedRoute, AdminRoute } from './Authentication'

import { Ilmottaudu, Hallinta } from './Dashboard'
import Login from './Login'
import AdminLogin from './AdminLogin'

class App extends Component {
    render = () => {
        return (
            <Fragment>
                <Helmet
                    titleTemplate="%s | Niilon Ylpparit"
                    title="Kirjaudu"
                    defaultTitle="Niilon Ylpparit"
                />
                <Router>
                    <Switch>
                        <Route path="/kirjaudu" exact component={Login} />
                        <Route path="/admin" exact component={AdminLogin} />

                        <ProtectedRoute path="/ilmottaudu" exact component={Ilmottaudu} />
                        <AdminRoute path="/hallinta" exact component={Hallinta} />

                        <Route path="/" exact render={() => <Redirect to="/kirjaudu" />} />

                        <Route
                            component={() => (
                                <div>
                                    <h2>404 - error</h2>
                                </div>
                            )}
                        />
                    </Switch>
                </Router>
            </Fragment>
        )
    }
}

export default connect()(App)
