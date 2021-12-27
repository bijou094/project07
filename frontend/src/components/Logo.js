import React, { Fragment } from 'react'
import icon from '../images/logow.svg'

export default function Logo() {
    return (
        <Fragment  >
            <img className="contenairLogo" src={icon} alt="logo entreprise" />
        </Fragment>
    )
}
