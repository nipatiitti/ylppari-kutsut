/**
 * Dashboard home component
 *
 * @author name <Niilo@vertics.co>
 *
 *
 */

import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

import {
    changeComing,
    followUsersUpdates,
    logout,
    deleteRelative,
    addUser,
    addRelative,
    deleteUser
} from 'actions'

import { Button, Checkbox, Input, Dialog } from '../Utils'

class Hallinta extends Component {
    constructor(props) {
        super(props)

        this.addUser = null
        this.addRelative = null

        this.state = {
            open: [],
            search: '',

            // Add User dialog
            addUser: false,
            name: '',
            isAdmin: false,

            // Add relative dialog
            addRelative: false,
            userId: null,
            relativeId: ''
        }
    }

    componentDidMount = () => {
        if (!this.props.following) {
            this.props.dispatch(followUsersUpdates())
        }
    }

    handleChange = name => e => {
        if (e.target) {
            this.setState({
                [name]: e.target.value
            })
        } else {
            this.setState({
                [name]: e
            })
        }
    }

    handleOpen = (id, open) => {
        if (open) {
            this.setState({
                open: [...this.state.open, id]
            })
        } else {
            this.setState({
                open: this.state.open.filter(key => key !== id)
            })
        }
    }

    handleAddUserClose = () => {
        this.setState({
            addUser: false,
            name: '',
            isAdmin: false
        })
    }

    handleAddRelativeClose = () => {
        this.setState({
            addRelative: false,
            userId: null,
            relativeId: ''
        })
    }

    handleAddUser = e => {
        e.preventDefault()
        const { name, isAdmin } = this.state
        addUser(name, isAdmin)
        this.handleAddUserClose()
    }

    handleAddRelative = e => {
        e.preventDefault()
        const { userId, relativeId } = this.state
        addRelative(userId, relativeId)
        this.handleAddUserClose()
    }

    renderUser = user => {
        const open = this.state.open.find(key => key == user.id)
        return (
            <div className="user" key={user.id}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <h2
                        style={{ cursor: 'pointer' }}
                        onClick={() => this.handleOpen(user.id, !open)}
                    >
                        {user.name}{' '}
                        <i className="material-icons">
                            {open ? 'arrow_drop_up' : 'arrow_drop_down'}
                        </i>{' '}
                    </h2>
                    <i
                        onClick={() => this.props.dispatch(deleteUser(user.id))}
                        className="material-icons delete"
                        style={{ color: 'salmon' }}
                    >
                        delete
                    </i>
                </div>
                {open && (
                    <div className="relativeContainer">
                        <span>ID:{'  ' + user.id}</span>
                        <span>Avec:{user.hasAvec ? '  Kyllä' : '  Ei'}</span>
                        <span>Tulossa:{user.isComing ? '  Kyllä' : '  Ei'}</span>
                        <span>Ei tulossa:{user.notComing ? '  Kyllä' : '  Ei'}</span>
                        <span>Allergiat:{'  ' + user.allergies}</span>
                        <span
                            style={{
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            Sukulaiset:
                            <i
                                className="material-icons"
                                onClick={() =>
                                    this.setState({ addRelative: true, userId: user.id }, () =>
                                        this.addRelative.focus()
                                    )
                                }
                            >
                                add
                            </i>
                        </span>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginLeft: '2em'
                            }}
                        >
                            {user.relatives.map(rel => (
                                <span className="relative" key={rel.id}>
                                    {rel.name}{' '}
                                    <i
                                        className="material-icons"
                                        onClick={() => deleteRelative(user.id, rel.id)}
                                    >
                                        close
                                    </i>
                                </span>
                            ))}
                        </div>
                    </div>
                )}
                <div className="break" />
            </div>
        )
    }

    renderStatistics = () => {
        const { users } = this.props

        const allUsers = users.length

        let avecs = 0
        const allergies = []

        for (let i = 0; i < users.length; i++) {
            const user = users[i]
            if (user.hasAvec) avecs++
            if (user.allergies !== '') allergies.push(`${user.name}: ${user.allergies}`)
        }

        const comingUsers = users.filter(user => user.isComing).length
        const notComing = users.filter(user => user.notComing).length

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexShrink: 0
                }}
            >
                <h2>Stastiikat:</h2>
                <span>{`Kutsuttu: ${allUsers}`}</span>
                <span>{`Tulossa/Kutsuttu: ${comingUsers}/${allUsers}, ${Math.round(
                    (comingUsers / allUsers) * 100
                )}%`}</span>
                <span>{`Avecs: ${avecs}`}</span>
                <span>{`Yhteensä tulossa: ${comingUsers + avecs}`}</span>
                <span>{`Ei tulossa (varmasti): ${notComing}`}</span>
                <h2>Allergiat:</h2>
                {allergies.map((allergie, i) => (
                    <span key={i}>{allergie}</span>
                ))}
            </div>
        )
    }

    sort = (a, b) =>
        a.name.split(' ')[1] < b.name.split(' ')[1]
            ? -1
            : a.name.split(' ')[1] > b.name.split(' ')[1]
            ? 1
            : 0

    render = () => (
        <Fragment>
            <Helmet title="Hallinta" />
            <Dialog
                handleClose={this.handleAddUserClose}
                open={this.state.addUser}
                title="Lisää käyttäjä"
            >
                <form onSubmit={this.handleAddUser} className="dialog-form">
                    <Input
                        label="Nimi"
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                        setRef={r => (this.addUser = r)}
                    />
                    <span style={{ display: 'flex' }}>
                        Admin:{'   '}
                        <Checkbox
                            onChange={this.handleChange('isAdmin')}
                            checked={this.state.isAdmin}
                        />
                    </span>
                    <Button type="submit">Lisää</Button>
                </form>
            </Dialog>
            <Dialog
                handleClose={this.handleAddRelativeClose}
                open={this.state.addRelative}
                title="Lisää sukulaisen id"
            >
                <form onSubmit={this.handleAddRelative} className="dialog-form">
                    <Input
                        label="ID"
                        value={this.state.relativeId}
                        onChange={this.handleChange('relativeId')}
                        setRef={r => (this.addRelative = r)}
                    />
                    <Button type="submit">Lisää</Button>
                </form>
            </Dialog>
            <div className="ilmottaudu-container">
                <div style={{ padding: '2em 0 0 0', flexShrink: 0 }}>
                    <Input
                        label="Search"
                        value={this.state.search}
                        onChange={this.handleChange('search')}
                    />
                </div>
                <div className="ilmottaudu-innerContainer">
                    {this.props.users &&
                        this.props.users
                            .filter(user =>
                                user.name.toLowerCase().includes(this.state.search.toLowerCase())
                            )
                            .sort(this.sort)
                            .map(user => this.renderUser(user))}
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '2em 0',
                        flexShrink: 0
                    }}
                >
                    <Button
                        onClick={() => this.setState({ addUser: true }, () => this.addUser.focus())}
                    >
                        Lisää käyttäjä
                    </Button>
                </div>
                {this.renderStatistics()}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '2em 0',
                        flexShrink: 0
                    }}
                >
                    <Button onClick={() => this.props.dispatch(logout())}>Kirjaudu Ulos</Button>
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    users: state.adminReducer.users,
    following: state.followingReducer.admin
})

export default connect(mapStateToProps)(Hallinta)
