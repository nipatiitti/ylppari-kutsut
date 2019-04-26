/**
 * Checkbox component
 *
 * @author name <Niilo@vertics.co>
 *
 *
 */

import React, { Fragment } from 'react'

const Checkbox = ({ checked, onChange = () => {} }) => (
    <div onClick={() => onChange(!checked)} className="checkbox-container">
        <div className={`checkbox checkbox-${checked}`}>
            {checked && <i className="material-icons">check</i>}
        </div>
    </div>
)

export default Checkbox
