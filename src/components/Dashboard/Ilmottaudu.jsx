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

import { changeComing, followUserUpdates, logout } from 'actions'

import AddToCalendar from '../AddToCalendar'

import { Button, Checkbox } from '../Utils'

const calendarConfig = {
    event: {
        title: 'Ylioppilasjuhlat, Niilo',
        description: 'Niilo Jaakkolan Ylioppilas juhlat, 2019',
        location: 'Finland, Naantali, 21110, Kultaranta Golf',
        startTime: '2019-06-01T11:00:00+03:00',
        endTime: '2019-06-01T21:00:00+03:00'
    },
    displayItemIcons: false,
    buttonLabel: 'Lisää kalenteriin',
    listItems: [{ apple: 'Apple' }, { outlook: 'Outlook' }, { google: 'Google' }]
}

class Ilmottaudu extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount = () => {
        if (!this.props.following) {
            this.props.dispatch(followUserUpdates(this.props.user.id))
        }
    }

    handleComingChange = id => isComing => {
        this.props.dispatch(changeComing(id, isComing))
    }

    render = () => (
        <Fragment>
            <Helmet>
                <title>Ilmottaudu</title>
            </Helmet>
            <div className="ilmottaudu-container">
                <div className="ilmottaudu-innerContainer">
                    <h2 id="mita">Mitä?</h2>
                    <span>Niilo Jaakkolan ylioppilas juhlat</span>
                    <h2 className="h2">Missä?</h2>
                    <span>
                        Kultaranta golf
                        <a
                            style={{ marginLeft: '1em' }}
                            href="https://www.google.com/maps/place/Unnamed+Road,+21100+Naantali/@60.4550447,21.9520316,17z/data=!3m1!4b1!4m5!3m4!1s0x468b8f5be3d8d3b9:0x29a64e5c99dc2b56!8m2!3d60.4550396!4d21.9538677"
                        >
                            Kartta
                        </a>
                    </span>
                    <h2 className="h2">Milloin?</h2>
                    <span style={{ marginBottom: '4.5em', display: 'flex' }}>
                        1.6.2019 12.00 - 21.00
                        <AddToCalendar {...calendarConfig} />
                    </span>
                    <div className="break" />
                    <h2 id="mina">Minä:</h2>
                    <span style={{ display: 'flex' }}>
                        Olen tulossa:{' '}
                        <Checkbox
                            checked={this.props.user.isComing}
                            onChange={this.handleComingChange(this.props.user.id)}
                        />
                    </span>
                    {this.props.user.relatives.length && <h2 id="mina">Perhe:</h2>}
                    {this.props.user.relatives.map(relative => (
                        <span key={relative.id} style={{ display: 'flex' }}>
                            {`${relative.name}: `}
                            <Checkbox
                                checked={relative.isComing}
                                onChange={this.handleComingChange(relative.id)}
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
                        <Button onClick={() => this.props.dispatch(logout())}>Kirjaudu Ulos</Button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    user: state.userReducer,
    following: state.followingReducer
})

export default connect(mapStateToProps)(Ilmottaudu)
