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

import { changeUser, followUserUpdates, logout, message } from 'actions'

import AddToCalendar from '../AddToCalendar'

import { Button, Checkbox, Input } from '../Utils'

const calendarConfig = {
    event: {
        title: 'Ylioppilasjuhlat, Niilo',
        description: 'Niilo Jaakkolan Ylioppilas juhlat, 2019',
        location: 'Finland, Naantali, 21110, Kultaranta Golf Vanha Päärakennus',
        startTime: '2019-06-01T14:00:00+03:00',
        endTime: '2019-06-01T19:00:00+03:00'
    },
    displayItemIcons: false,
    buttonLabel: 'Lisää kalenteriin',
    listItems: [{ apple: 'Apple' }, { outlook: 'Outlook' }, { google: 'Google' }]
}

class Ilmottaudu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allergies: props.user.allergies
        }
    }

    componentDidUpdate = () => {
        if (this.props.user.allergies !== this.state.allergies) {
            this.setState({
                allergies: this.props.user.allergies
            })
        }
    }

    componentDidMount = () => {
        if (!this.props.following) {
            this.props.dispatch(followUserUpdates(this.props.user.id))
        }
    }

    handleUserChange = (id, field) => e => {
        if (e.target) {
            changeUser(id, { [field]: e.target.value })
        } else {
            changeUser(id, { [field]: e })
        }
    }

    handleAllergiesChange = e => {
        this.setState({
            allergies: e.target.value
        })
        changeUser(this.props.user.id, { allergies: e.target.value })
    }

    render = () => (
        <Fragment>
            <Helmet title="Ilmottaudu" />
            <div className="ilmottaudu-container">
                <div className="ilmottaudu-innerContainer">
                    <h2 id="mita">Mitä?</h2>
                    <span>Niilo Jaakkolan ylioppilas juhlat</span>
                    <h2 className="h2">Missä?</h2>
                    <span>
                        Naantali, 21110, Kultaranta golf Vanha päärakennus
                        <a
                            style={{ marginLeft: '1em' }}
                            href="https://www.google.com/maps/place/Unnamed+Road,+21100+Naantali/@60.4550447,21.9520316,17z/data=!3m1!4b1!4m5!3m4!1s0x468b8f5be3d8d3b9:0x29a64e5c99dc2b56!8m2!3d60.4550396!4d21.9538677"
                        >
                            Kartta
                        </a>
                    </span>
                    <h2 className="h2">Milloin?</h2>
                    <span style={{ marginBottom: '4.5em', display: 'flex' }}>
                        1.6.2019 14.00 - 19.00
                        <AddToCalendar {...calendarConfig} />
                    </span>
                    <div className="break" />
                    <h2 id="mina">Minä:</h2>
                    <span style={{ display: 'flex', padding: '.6em 0' }}>
                        Olen tulossa:{' '}
                        <Checkbox
                            checked={this.props.user.isComing}
                            onChange={this.handleUserChange(this.props.user.id, 'isComing')}
                        />
                    </span>
                    <span style={{ display: 'flex', marginBottom: '2.5em', padding: '.6em 0' }}>
                        Tuon avecin:{' '}
                        <Checkbox
                            checked={this.props.user.hasAvec}
                            onChange={this.handleUserChange(this.props.user.id, 'hasAvec')}
                        />
                    </span>
                    <Input
                        label={`${
                            this.props.user.hasAvec
                                ? 'Minun ja/tai avecini allergiat'
                                : 'Allergiani'
                        }`}
                        onChange={this.handleAllergiesChange}
                        value={this.state.allergies}
                    />
                    {this.props.user.relatives.length && (
                        <Fragment>
                            <h2 id="mina">Perhe:</h2>
                            <span className="smalltext">
                                Voit tästä kirjata perheen jäseniäsi tulossa oleviksi, mutta jos
                                heillä on allergioita/avec yms. pitää heidän (tai sinun heidän
                                nimellään) kirjautua sisälle ja merkitä se itse
                            </span>
                        </Fragment>
                    )}

                    {this.props.user.relatives.map(relative => (
                        <span key={relative.id} style={{ display: 'flex', padding: '.6em 0' }}>
                            {`${relative.name}: `}
                            <Checkbox
                                checked={relative.isComing}
                                onChange={this.handleUserChange(relative.id, 'isComing')}
                            />
                        </span>
                    ))}
                    <div
                        style={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            margin: '3em 0'
                        }}
                    >
                        <Button onClick={() => this.props.dispatch(message())}>Tallenna</Button>
                    </div>
                    <div
                        style={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            margin: '0 0 3em 0'
                        }}
                    >
                        <Button onClick={() => this.props.dispatch(logout())}>Kirjaudu ulos</Button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    user: state.userReducer,
    following: state.followingReducer.user
})

export default connect(mapStateToProps)(Ilmottaudu)
