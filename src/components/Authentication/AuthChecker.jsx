/**
 * A Reusable wrapper component
 * Define authentication state and pass it to its children
 *
 * @author name <Niilo.jaakkola@icloud.com>
 *
 *
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'

class AuthCheck extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAuthenticated: true
        }
    }

    componentDidMount() {
        if (!this.props.user.loggedIn) {
            this.setState({ isAuthenticated: false })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.user.loggedIn && prevProps.user.loggedIn != this.props.user.loggedIn) {
            this.setState({ isAuthenticated: true })
        } else if (
            !this.props.user.loggedIn &&
            prevProps.user.loggedIn != this.props.user.loggedIn
        ) {
            this.setState({ isAuthenticated: false })
        }
    }
    render() {
        return this.props.children({
            isAuthenticated: this.state.isAuthenticated
        })
    }
}

const mapStateToProps = state => ({
    user: state.userReducer
})

export default connect(mapStateToProps)(AuthCheck)
