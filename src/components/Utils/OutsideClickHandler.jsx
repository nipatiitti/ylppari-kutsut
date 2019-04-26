import React, { Component } from 'react'

import { addEventListener } from 'consolidated-events'

import contains from 'document.contains'

class OutsideClickHandler extends Component {
    componentDidMount() {
        this.addMouseDownEventListener()
    }

    componentWillUnmount = () => {
        this.removeEventListeners()
    }

    // Use mousedown/mouseup to enforce that clicks remain outside the root's
    // descendant tree, even when dragged. This should also get triggered on
    // touch devices.
    onMouseDown = e => {
        const isDescendantOfRoot = this.childNode && contains(this.childNode, e.target)
        if (!isDescendantOfRoot) {
            this.removeMouseUp = addEventListener(document, 'mouseup', this.onMouseUp, {
                capture: true
            })
        }
    }

    // Use mousedown/mouseup to enforce that clicks remain outside the root's
    // descendant tree, even when dragged. This should also get triggered on
    // touch devices.
    onMouseUp = e => {
        const { onOutsideClick } = this.props

        const isDescendantOfRoot = this.childNode && contains(this.childNode, e.target)
        if (this.removeMouseUp) this.removeMouseUp()
        this.removeMouseUp = null

        if (!isDescendantOfRoot) {
            onOutsideClick(e)
        }
    }

    setChildNodeRef = ref => {
        this.childNode = ref
    }

    addMouseDownEventListener = () => {
        this.removeMouseDown = addEventListener(document, 'mousedown', this.onMouseDown, {
            capture: true
        })
    }

    removeEventListeners = () => {
        if (this.removeMouseDown) this.removeMouseDown()
        if (this.removeMouseUp) this.removeMouseUp()
    }

    render() {
        const { children } = this.props

        return (
            <div onClick={this.props.onClick} ref={this.setChildNodeRef}>
                {children}
            </div>
        )
    }
}

export default OutsideClickHandler
