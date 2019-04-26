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

import { Button } from '../Utils'

const Hallinta = ({ dispatch }) => {
    return (
        <Fragment>
            <Helmet>
                <title>Hallinta</title>
            </Helmet>
            <div>Admin hallinta</div>
        </Fragment>
    )
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(Hallinta)
