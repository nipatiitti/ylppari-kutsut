/**
 * Protected route
 * Only let user access the route if user has been authenticated
 * Otherwise redirect user to login page
 *
 * @author name <Niilo.jaakkola@icloud.com>
 *
 */

import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import AdminChecker from './AdminChecker'

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <AdminChecker>
            {({ isAuthenticated }) => (
                <Route
                    {...rest}
                    render={props =>
                        isAuthenticated ? <Component {...props} /> : <Redirect to="/admin" />
                    }
                />
            )}
        </AdminChecker>
    )
}

export default ProtectedRoute
