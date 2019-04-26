/**
 * Login component
 *
 * @author name <Niilo@vertics.co>
 *
 *
 */

import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { login, register } from 'actions'

import { Button, Loading, Input } from './Utils'

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            failed: false,
            loading: false
        }
    }

    componentDidMount = () => {
        if (this.props.user.loggedIn) {
            this.props.history.replace('/ilmottaudu')
        }
    }

    handleLogin = e => {
        e.preventDefault()

        const { firstName, lastName } = this.state
        this.setState({
            loading: true
        })
        this.props
            .dispatch(login({ firstName, lastName }))
            .then(() => this.props.history.replace('/ilmottaudu'))
            .catch(e => {
                console.error(e)
                this.setState({
                    loading: false,
                    failed: true
                })
            })
    }

    handleChange = name => e =>
        this.setState({
            [name]: e.target.value
        })

    render() {
        return (
            <div className="login-container">
                <Helmet>
                    <title>Kirjaudu</title>
                </Helmet>
                <div className="login-left">
                    <h1>Tervetuloa</h1>
                    <span>Niilon Ylioppilasjuhlien Kutsuportaali</span>
                </div>
                <div className="login-right">
                    {this.state.loading ? (
                        <Loading />
                    ) : (
                        <Fragment>
                            {this.state.failed && (
                                <div className="login-failed">
                                    <h3>Näyttää siltä, ettet ole kutsulistalla</h3>
                                    <span>
                                        Jos uskot tämän olevan virhe laita viestiä{' '}
                                        <a href="mailto:niilo.jaakkola@icloud.com">
                                            niilo.jaakkola@icloud.com
                                        </a>
                                    </span>
                                </div>
                            )}
                            <form onSubmit={this.handleLogin}>
                                <Input
                                    label="Etunimi"
                                    value={this.state.firstName}
                                    onChange={this.handleChange('firstName')}
                                />
                                <Input
                                    label="Sukunimi"
                                    value={this.state.lastName}
                                    onChange={this.handleChange('lastName')}
                                />
                                <Button type="submit">Ilmottaudu</Button>
                            </form>
                            <div className="admin">
                                <Link to="/admin">Hallinta</Link>
                            </div>
                        </Fragment>
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.userReducer
})

export default connect(mapStateToProps)(Login)
