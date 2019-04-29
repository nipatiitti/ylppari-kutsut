import React from 'react'

import { connect } from 'react-redux'

const Message = ({ open }) => (
    <div className={`message message-${open ? 'open' : 'closed'}`}>
        <h3 style={{ color: '#bdedb4' }}>Tallennettu!</h3>
    </div>
)

const mapStateToProps = state => ({
    open: state.messageReducer
})

export default connect(mapStateToProps)(Message)
