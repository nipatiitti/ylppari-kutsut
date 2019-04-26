import React from 'react'
import { OutsideClickHandler } from '.'

const CustomDialog = ({ handleClose, open, title, children }) => (
    <div className={`dialog-container ${open}`}>
        <OutsideClickHandler onOutsideClick={handleClose}>
            <div className="dialog">
                <h2>{title}</h2>
                {children}
            </div>
        </OutsideClickHandler>
    </div>
)

export default CustomDialog
