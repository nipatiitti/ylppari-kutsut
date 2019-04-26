/**
 * Login component
 *
 * @author name <Niilo@vertics.co>
 *
 *
 */

import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import { adminLogin, register } from 'actions'

import { Button, Loading, Input } from './Utils'

class AdminLogin extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            password: '',
            failed: false,
            loading: false
        }
    }

    componentDidMount = () => {
        if (this.props.user.loggedIn) {
            this.props.history.replace('/hallinta')
        }
    }

    handleLogin = e => {
        e.preventDefault()

        const { name, password } = this.state
        this.setState({
            loading: true
        })
        this.props
            .dispatch(adminLogin({ name, password }))
            .then(() => this.props.history.replace('/hallinta'))
            .catch(e => {
                if (e.type) {
                    this.setState({
                        loading: false,
                        failed: e.type
                    })
                } else {
                    console.error(e)
                    this.setState({
                        loading: false,
                        failed: true
                    })
                }
            })
    }

    handleChange = name => e =>
        this.setState({
            [name]: e.target.value
        })

    render = () => (
        <div className="login-container">
            <Helmet>
                <title>Kirjaudu</title>
            </Helmet>
            <div className="login-left">
                <h1>Tervetuloa</h1>
                <span>NYK admin kirjautuminen</span>
            </div>
            <div className="login-right">
                {this.state.loading ? (
                    <Loading />
                ) : (
                    <Fragment>
                        {this.state.failed && (
                            <div className="login-failed">
                                <h3>
                                    {this.state.failed == 'NOT_ADMIN'
                                        ? 'Et ole admin käyttäjä'
                                        : 'Salasana väärin'}
                                </h3>
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
                                label="Nimi"
                                value={this.state.name}
                                onChange={this.handleChange('name')}
                            />
                            <Input
                                type="password"
                                label="Salasana"
                                value={this.state.salasana}
                                onChange={this.handleChange('salasana')}
                            />
                            <Button type="submit">Ilmottaudu</Button>
                        </form>
                    </Fragment>
                )}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.userReducer
})

export default connect(mapStateToProps)(AdminLogin)
